-- ============================================================================
-- Raji Backend — Schema v0 (init migration)
-- ============================================================================
--
-- Project        : Raji (voice assistant for India)
-- Migration      : 0001_init
-- Created        : 2026-04-24
-- Author         : Backend scaffold (Claude PM)
-- Region         : Supabase Mumbai (ap-south-1)
-- Postgres       : 15+
-- Extensions     : pgvector (D-15), pgcrypto (UUIDs), uuid-ossp
--
-- Source docs:
--   - RAJI-CONTEXT.md §D-10 (DPDP), §D-15 (Postgres+pgvector)
--   - MASTER-ARCHITECTURE.md §1 "Unified Tech Stack"
--   - terminal-3-ai/conversation-memory.md §3 "Long-term memory — SQLite vs vector DB"
--   - expert-knowledge/05-security-privacy.md (RLS + encryption-at-rest rules)
--   - expert-knowledge/06-india-compliance.md (DPDP retention + consent)
--
-- Design notes:
--   * All user-scoped tables have RLS enabled; a user can ONLY see rows where
--     user_id = auth.uid(). Service role bypasses (used by Edge Functions when
--     the caller is acting on a validated JWT).
--   * Vectors are 384-dim — matches on-device multilingual-e5-small quantized
--     INT8 so client-produced and server-produced embeddings are comparable
--     (conversation-memory.md §3).
--   * No raw audio ever stored. No full transcripts in action_log. DPDP-aligned
--     (expert-knowledge/06 §"What Raji should NEVER send to the cloud").
--   * updated_at is maintained by a single reusable trigger (public.set_updated_at).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Extensions
-- ---------------------------------------------------------------------------
create extension if not exists "pgcrypto";      -- gen_random_uuid()
create extension if not exists "uuid-ossp";
create extension if not exists "vector";        -- pgvector (D-15)

-- ---------------------------------------------------------------------------
-- 2. Shared ENUM types
-- ---------------------------------------------------------------------------
do $$ begin
  create type public.message_role as enum ('user', 'assistant', 'tool');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.memory_type as enum (
    'preference',   -- user preferences (wake_word, default_lang, etc.)
    'nickname',     -- contact alias (e.g. "mom babu")
    'routine',      -- saved routine/automation
    'device_alias', -- IoT alias ("bedroom light")
    'episodic',     -- episodic recall, wrapped via <recalled_content> at use
    'fact'          -- misc structured fact
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.contact_alias_type as enum ('contact', 'group', 'business');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.iot_backend as enum (
    'google_home',   -- primary IoT backend (D-14-A)
    'smartthings',   -- secondary (D-14-B)
    'home_assistant',-- advanced (D-14-C)
    'tuya',          -- brand cloud (D-14-D)
    'broadlink',     -- IR bridge (D-14-E)
    'hue',           -- Philips Hue LAN
    'sensibo',       -- AC-specific
    'matter',        -- Matter over Thread/Wi-Fi
    'other'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.action_status as enum (
    'success', 'failure', 'partial', 'rate_limited', 'blocked', 'pending'
  );
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
-- 3. updated_at trigger (shared by all tables)
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- ===========================================================================
-- 4. users_profile
--    One row per auth.users row, carries Raji-specific preferences.
-- ===========================================================================
create table if not exists public.users_profile (
  id              uuid primary key references auth.users(id) on delete cascade,
  display_name    text,
  locale          text not null default 'hi-IN',   -- ISO; Hinglish served as hi-IN
  wake_word       text not null default 'raji',    -- D-04 Phase 1.1 custom wake word
  voice_pref      text not null default 'platform',-- platform | azure_neural | piper
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger trg_users_profile_updated
  before update on public.users_profile
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- 5. conversations
--    High-level session record. `summary` holds rolling Haiku summary
--    (<=200 tokens per conversation-memory.md §2). NO raw transcripts here.
-- ===========================================================================
create table if not exists public.conversations (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  started_at     timestamptz not null default now(),
  ended_at       timestamptz,
  summary        text,
  message_count  int not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists idx_conversations_user_started
  on public.conversations (user_id, started_at desc);

create trigger trg_conversations_updated
  before update on public.conversations
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- 6. messages
--    Per-turn messages for a conversation. For DPDP we store ONLY the
--    episodic-extracted text (not raw audio, not unredacted transcripts).
--    Client is responsible for redacting OTPs/secrets before push.
-- ===========================================================================
create table if not exists public.messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  role            public.message_role not null,
  content         text not null,
  metadata        jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now()
);

create index if not exists idx_messages_conversation_created
  on public.messages (conversation_id, created_at);

-- ===========================================================================
-- 7. memories
--    Long-term memory mirror of on-device SQLite+sqlite-vss, per D-15.
--    `embedding` dim = 384 (multilingual-e5-small, conversation-memory.md §3).
-- ===========================================================================
create table if not exists public.memories (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  content        text not null,
  embedding      vector(384),
  type           public.memory_type not null,
  importance     smallint not null default 5 check (importance between 0 and 10),
  created_at     timestamptz not null default now(),
  last_accessed  timestamptz,
  expires_at     timestamptz,            -- DPDP retention; null = "forever"
  updated_at     timestamptz not null default now()
);

create index if not exists idx_memories_user_type
  on public.memories (user_id, type);

create index if not exists idx_memories_user_last_accessed
  on public.memories (user_id, last_accessed desc nulls last);

create index if not exists idx_memories_expires
  on public.memories (expires_at) where expires_at is not null;

-- IVFFlat ANN index for semantic search. Lists=100 is a reasonable starting
-- point for <100K rows per user — re-tune when table size demands.
-- Requires `ANALYZE` after initial load for query planner.
create index if not exists idx_memories_embedding
  on public.memories using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

create trigger trg_memories_updated
  before update on public.memories
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- 8. contacts_aliases
--    Backend mirror of client's contact_nicknames table.
--    *** IMPORTANT (expert-knowledge/05 + 06) ***
--    Phone/email columns exist for sync convenience but should hold ONLY the
--    contacts the user has explicitly let Raji remember. Do NOT bulk-upload
--    the phonebook. Client enforces this.
-- ===========================================================================
create table if not exists public.contacts_aliases (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  alias         text not null,
  contact_name  text,
  phone         text,
  email         text,
  type          public.contact_alias_type not null default 'contact',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (user_id, alias)
);

create index if not exists idx_contacts_aliases_user
  on public.contacts_aliases (user_id);

create trigger trg_contacts_aliases_updated
  before update on public.contacts_aliases
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- 9. devices
--    Registered client devices. Supports cross-device sync (Phase 4).
-- ===========================================================================
create table if not exists public.devices (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  device_type    text not null,         -- 'android' | 'windows' | 'linux'
  device_id      text not null,          -- client-generated install id (NOT IMEI)
  manufacturer   text,
  os_version     text,
  app_version    text,
  last_seen_at   timestamptz not null default now(),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  unique (user_id, device_id)
);

create index if not exists idx_devices_user_last_seen
  on public.devices (user_id, last_seen_at desc);

create trigger trg_devices_updated
  before update on public.devices
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- 10. iot_devices
--     Canonical IoT device registry — one row per connected device, regardless
--     of backend (D-14-F: single canonical model, deterministic router).
-- ===========================================================================
create table if not exists public.iot_devices (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references auth.users(id) on delete cascade,
  name               text not null,
  aliases            text[] not null default '{}',   -- ["bedroom light", "upar wali light"]
  room               text,
  type               text not null,                   -- 'light' | 'switch' | 'ac' | 'fan' | 'tv' | ...
  capabilities       jsonb not null default '{}'::jsonb,
  backend            public.iot_backend not null,
  backend_device_id  text not null,                  -- vendor-side id
  state              jsonb not null default '{}'::jsonb,
  last_updated       timestamptz not null default now(),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  unique (user_id, backend, backend_device_id)
);

create index if not exists idx_iot_devices_user
  on public.iot_devices (user_id);

create index if not exists idx_iot_devices_user_room
  on public.iot_devices (user_id, room);

-- GIN index on aliases for fast alias→device lookup by intent router.
create index if not exists idx_iot_devices_aliases
  on public.iot_devices using gin (aliases);

create trigger trg_iot_devices_updated
  before update on public.iot_devices
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- 11. action_log (audit)
--     Append-only log of sensitive actions. DPDP retention: 90 days.
--     *** PII scrub rules (expert-knowledge/05 §"Audit logging") ***
--     - Never store full transcript
--     - Never store OTPs, passwords, UPI IDs
--     - `details` holds only high-level metadata (action_type, tool, counts)
-- ===========================================================================
create table if not exists public.action_log (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  action_type  text not null,     -- 'anthropic_proxy' | 'sarvam_proxy' | 'iot_command' | ...
  details      jsonb not null default '{}'::jsonb,
  status       public.action_status not null,
  created_at   timestamptz not null default now()
);

create index if not exists idx_action_log_user_created
  on public.action_log (user_id, created_at desc);

create index if not exists idx_action_log_type_created
  on public.action_log (action_type, created_at desc);

-- ===========================================================================
-- 12. rate_limits
--     Token-bucket state, per (user, bucket). Used by _shared/rate-limit.ts.
--     Primary key is (user_id, bucket) so a single atomic upsert is enough.
-- ===========================================================================
create table if not exists public.rate_limits (
  user_id       uuid not null references auth.users(id) on delete cascade,
  bucket        text not null,        -- 'anthropic' | 'sarvam' | 'global' | ...
  count         int not null default 0,
  window_start  timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  primary key (user_id, bucket)
);

create trigger trg_rate_limits_updated
  before update on public.rate_limits
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- 13. consent_records
--     DPDP-compliant consent ledger. One row per (user, purpose, version).
--     Purposes are per-feature (NOT bundled):
--       'mic_voice_to_stt', 'contacts_lookup', 'sms_send', 'location_once',
--       'voice_biometric_enrollment', 'analytics_crashes', ...
--     Granting a new version supersedes the old but we keep history for audit.
-- ===========================================================================
create table if not exists public.consent_records (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  purpose     text not null,
  version     text not null,         -- e.g. 'privacy-v1.0.0'
  granted_at  timestamptz,
  revoked_at  timestamptz,
  metadata    jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists idx_consent_records_user_purpose
  on public.consent_records (user_id, purpose);

create index if not exists idx_consent_records_active
  on public.consent_records (user_id, purpose) where revoked_at is null;

create trigger trg_consent_records_updated
  before update on public.consent_records
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- 14. Helper: match_memories() — ANN search wrapper with RLS-safe user filter.
--     Called by Edge Functions when implementing server-side recall.
-- ===========================================================================
create or replace function public.match_memories(
  query_user_id   uuid,
  query_embedding vector(384),
  match_count     int default 5,
  min_importance  smallint default 0
)
returns table (
  id             uuid,
  content        text,
  type           public.memory_type,
  importance     smallint,
  similarity     float,
  created_at     timestamptz
)
language sql stable
as $$
  select
    m.id,
    m.content,
    m.type,
    m.importance,
    1 - (m.embedding <=> query_embedding) as similarity,
    m.created_at
  from public.memories m
  where m.user_id = query_user_id
    and m.importance >= min_importance
    and m.embedding is not null
    and (m.expires_at is null or m.expires_at > now())
  order by m.embedding <=> query_embedding
  limit match_count;
$$;

-- ===========================================================================
-- 15. Row-Level Security (RLS)
-- ===========================================================================
alter table public.users_profile     enable row level security;
alter table public.conversations     enable row level security;
alter table public.messages          enable row level security;
alter table public.memories          enable row level security;
alter table public.contacts_aliases  enable row level security;
alter table public.devices           enable row level security;
alter table public.iot_devices       enable row level security;
alter table public.action_log        enable row level security;
alter table public.rate_limits       enable row level security;
alter table public.consent_records   enable row level security;

-- ----- users_profile: user sees/edits only their own row -----
create policy "users_profile_select_own"
  on public.users_profile for select
  using (auth.uid() = id);

create policy "users_profile_insert_own"
  on public.users_profile for insert
  with check (auth.uid() = id);

create policy "users_profile_update_own"
  on public.users_profile for update
  using (auth.uid() = id);

create policy "users_profile_delete_own"
  on public.users_profile for delete
  using (auth.uid() = id);

-- ----- conversations -----
create policy "conversations_rw_own"
  on public.conversations for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ----- messages (joined via conversation.user_id) -----
create policy "messages_rw_own"
  on public.messages for all
  using (
    exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
        and c.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
        and c.user_id = auth.uid()
    )
  );

-- ----- memories -----
create policy "memories_rw_own"
  on public.memories for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ----- contacts_aliases -----
create policy "contacts_aliases_rw_own"
  on public.contacts_aliases for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ----- devices -----
create policy "devices_rw_own"
  on public.devices for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ----- iot_devices -----
create policy "iot_devices_rw_own"
  on public.iot_devices for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ----- action_log: user may READ own history; WRITES go through service role -----
create policy "action_log_select_own"
  on public.action_log for select
  using (auth.uid() = user_id);

-- ----- rate_limits: user reads own state; service role writes -----
create policy "rate_limits_select_own"
  on public.rate_limits for select
  using (auth.uid() = user_id);

-- ----- consent_records -----
create policy "consent_records_rw_own"
  on public.consent_records for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ===========================================================================
-- 16. Auto-create users_profile row when a new auth.users row arrives.
-- ===========================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users_profile (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ===========================================================================
-- 17. Grants — service_role bypasses RLS by default; authenticated users go
--     through RLS policies above. anon is blocked except Auth flows.
-- ===========================================================================
grant usage on schema public to anon, authenticated, service_role;
grant all on all tables in schema public to service_role;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant execute on all functions in schema public to authenticated, service_role;

-- ===========================================================================
-- END OF 0001_init.sql
-- ===========================================================================
