# Raji Backend

Supabase-based backend for Raji. Handles (a) auth (phone OTP + email), (b) Anthropic Claude API proxy, (c) Sarvam Saaras v2 STT proxy, (d) per-user rate limiting, (e) user data (conversations, memory, IoT devices, consent ledger).

Region: **Mumbai (ap-south-1)** — DPDP alignment, D-15.

---

## Architecture at a glance

```
Android / Win / Linux client
      |
      | Supabase JWT (phone OTP or email login)
      v
Supabase Edge Functions (Deno)
  - anthropic-proxy   -> Anthropic API
  - sarvam-proxy      -> Sarvam Saaras v2
      |
      v
Supabase Postgres 15 + pgvector
  - users_profile, conversations, messages
  - memories (vector(384) = multilingual-e5-small)
  - contacts_aliases, devices, iot_devices
  - action_log, rate_limits, consent_records
  - RLS policies (user sees only their own rows)
```

Full design: `raji-research/MASTER-ARCHITECTURE.md` §1 and §3.
Locked decisions: `raji-research/RAJI-CONTEXT.md` §2 (D-09, D-10, D-15).

---

## Layout

```
backend/
  supabase/
    config.toml                 # Supabase project config (auth, functions, realtime)
    migrations/
      0001_init.sql             # Schema v0 — tables + RLS + pgvector
    functions/
      import_map.json
      _shared/
        auth.ts                 # JWT verification + CORS helpers
        rate-limit.ts           # Token-bucket limiter (Postgres-backed)
      anthropic-proxy/
        index.ts                # Claude proxy (SSE passthrough)
      sarvam-proxy/
        index.ts                # STT proxy
  deno.json                     # Deno lint/fmt/tasks
  tsconfig.json                 # Editor tooling only
  .env.example                  # Env var template
  README.md                     # This file
```

---

## Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/cli) v1.200+ (`supabase --version`)
- [Deno](https://deno.com) 1.46+ (ships with Supabase CLI for functions)
- Docker Desktop (for `supabase start` local stack)
- Accounts:
  - Supabase (create project in **Mumbai** region)
  - Anthropic (for `ANTHROPIC_API_KEY`)
  - Sarvam (for `SARVAM_API_KEY` — commercial onboarding required)

---

## First-time setup

```bash
# From repo root
cd backend

# 1. Link to Supabase project (get ref from dashboard URL)
supabase login
supabase link --project-ref <your-project-ref>

# 2. Copy env template
cp .env.example .env
# Fill in SUPABASE_URL / ANON / SERVICE_ROLE / ANTHROPIC_API_KEY / SARVAM_API_KEY

# 3. (Optional) Start local stack — replicates Mumbai project locally
supabase start
# This gives you a local Postgres at :54322, API at :54321, Studio at :54323.
```

---

## Apply migration

```bash
# Against linked remote project
supabase db push

# Or locally
supabase migration up
```

Verify:

```bash
supabase db remote list            # confirm migration 0001_init applied
psql "$SUPABASE_DB_URL" -c "\dt public.*"
```

You should see: `users_profile`, `conversations`, `messages`, `memories`, `contacts_aliases`, `devices`, `iot_devices`, `action_log`, `rate_limits`, `consent_records`.

---

## Deploy Edge Functions

```bash
# Set secrets on the Supabase project (NOT in .env for prod)
supabase secrets set \
  ANTHROPIC_API_KEY="sk-ant-..." \
  SARVAM_API_KEY="..." \
  ANTHROPIC_VERSION="2023-06-01"

# Deploy each function
supabase functions deploy anthropic-proxy
supabase functions deploy sarvam-proxy

# Verify deployments
supabase functions list
```

Functions are invoked at:

```
https://<project-ref>.supabase.co/functions/v1/anthropic-proxy
https://<project-ref>.supabase.co/functions/v1/sarvam-proxy
```

---

## Quick smoke test

```bash
# Get a user JWT via phone OTP flow from your client app, then:
TOKEN="<user-access-token>"

# Anthropic proxy
curl -N -X POST \
  "https://<project-ref>.supabase.co/functions/v1/anthropic-proxy" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-haiku-4-5",
    "max_tokens": 128,
    "stream": true,
    "messages": [{"role": "user", "content": "Say hi in Hinglish."}]
  }'

# Sarvam proxy
curl -X POST \
  "https://<project-ref>.supabase.co/functions/v1/sarvam-proxy" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@sample.wav" \
  -F "language_code=hi-IN"
```

---

## Rate limits (defaults)

| Bucket      | Limit  | Window |
|-------------|--------|--------|
| `anthropic` | 30 req | 60 s   |
| `sarvam`    | 60 req | 60 s   |

Tune in `_shared/rate-limit.ts` (`DEFAULT_BUCKETS`) or via env once we migrate to the `rate_limit_touch` RPC. 429 response includes `Retry-After` + `X-RateLimit-Remaining`.

---

## DPDP / Privacy rules baked in

Source: `raji-research/expert-knowledge/05-security-privacy.md` §"Audit logging" + `06-india-compliance.md`.

- **No raw audio persisted.** `sarvam-proxy` streams audio through; no `arrayBuffer()` call, no storage write.
- **No full transcripts in logs.** `action_log.details` stores only metadata (model, upstream status, audio seconds).
- **RLS on every user-scoped table.** Users cannot read another user's rows, even with a valid JWT.
- **Consent ledger.** `consent_records` table mirrors DPDP just-in-time per-purpose consent.
- **Retention aid.** `memories.expires_at`; a nightly job (TBD) purges expired rows + vector index entries.

---

## Local development loop

```bash
# Serve functions locally with live reload
supabase functions serve anthropic-proxy --env-file .env

# In another terminal: run the DB + auth locally
supabase start

# Hit local endpoint
curl -N -X POST http://localhost:54321/functions/v1/anthropic-proxy \
  -H "Authorization: Bearer <local-user-jwt>" \
  -H "Content-Type: application/json" \
  -d '{"model": "claude-haiku-4-5", "messages": [...], "stream": true}'
```

---

## Operational checklist before production

- [ ] Supabase project created in `ap-south-1` Mumbai (confirm in project settings)
- [ ] Migration `0001_init.sql` applied cleanly against remote
- [ ] `pgvector` extension enabled (check Dashboard -> Database -> Extensions)
- [ ] Secrets set: `ANTHROPIC_API_KEY`, `SARVAM_API_KEY`, `ANTHROPIC_VERSION`
- [ ] Phone OTP provider configured (MSG91 or Twilio); cost accepted
- [ ] SMS template matches `config.toml [auth.sms].template`
- [ ] Edge functions deployed and reachable
- [ ] Smoke test: anon JWT -> 401; valid JWT -> 200 stream
- [ ] Anthropic budget alert set in Anthropic console
- [ ] Backup region configured (Supabase handles PITR; verify retention >= 7 days)
- [ ] DPDP privacy policy drafted and linked from `raji.app`
- [ ] Grievance officer listed in privacy policy

---

## Future migrations

Create new migration with:

```bash
supabase migration new <descriptive_name>
```

Naming convention: `000N_description.sql`, increment N. Never edit applied migrations — add a follow-up.

Open items that will require future migrations:
- `rate_limit_touch` atomic RPC (currently uses fallback upsert path)
- Nightly cron for `memories.expires_at` purge + vector cleanup
- Consent Manager webhook table (Phase 2, Nov 2026 regulatory milestone)

---

## Troubleshooting

- **`permission denied for table <x>`** -> user is not authenticated. Confirm `Authorization: Bearer <jwt>` header.
- **`permission denied` on service-role calls** -> you grabbed the anon key instead of `service_role`. Service role key is under Dashboard -> Project Settings -> API.
- **Cold-start slow on first function call** -> Supabase Edge Functions cold start ~200-400 ms. For p50 <1.8 s voice pipeline (D-11) we accept this; for high-QPS endpoints consider a warm-ping cron.
- **Sarvam 415 Unsupported Media** -> Sarvam expects `multipart/form-data`. Client must set correct Content-Type; proxy forwards it verbatim.

---

*Maintainer: Raji PM (Claude session). For questions, see the master docs in `raji-research/`.*
