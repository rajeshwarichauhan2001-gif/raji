# Data Model

Two stores: **Supabase Postgres (backend)** and **SQLite (on-device)**. Sensitive data (raw audio, full messages) stays on-device; aggregated/syncable data goes to backend.

## Backend (Supabase Postgres, Mumbai region)

Full schema lives in `backend/supabase/migrations/0001_init.sql`. Summary:

| Table | Purpose | Key columns |
|-------|---------|-------------|
| `users_profile` | One row per user; preferences | id (FK auth.users), display_name, locale, wake_word, voice_pref |
| `conversations` | Session metadata | id, user_id, started_at, ended_at, summary |
| `messages` | Role-tagged messages per conversation | id, conversation_id, role, content, created_at, metadata |
| `memories` | Long-term semantic memory with embeddings | id, user_id, content, embedding VECTOR(384), type, importance |
| `contacts_aliases` | User-taught contact nicknames ("mom babu") | id, user_id, alias, contact_name, phone, email |
| `devices` | Registered user devices | id, user_id, device_type, device_id, manufacturer, os_version |
| `iot_devices` | Canonical IoT device model (D-21) | id, user_id, name, aliases[], room, type, capabilities, backend, state |
| `action_log` | Audit trail for sensitive actions | id, user_id, action_type, details, status, created_at |
| `rate_limits` | Token bucket for abuse prevention | user_id, bucket, count, window_start |
| `consent_records` | DPDP-aligned consent history | user_id, purpose, granted_at, revoked_at, version |

All tables use Row Level Security: users can only see/modify their own rows. Service role bypasses RLS for backend-internal operations (Edge Functions only).

## On-device (SQLite + SQLCipher)

Encrypted with SQLCipher (AES-256). Schema applied on first launch.

| Table | Purpose |
|-------|---------|
| `local_memory` | Recent conversation cache (last 30 days rolling) |
| `local_embeddings` | sqlite-vss 384-dim embeddings for fast local memory search |
| `local_preferences` | Immediate preferences without round-trip |
| `oem_state` | Detected OEM + setup checklist completion per expert-knowledge/02 |
| `command_cache` | Pre-rendered TTS for common responses (zero-latency playback) |
| `pending_sync` | Queued items to sync when online |
| `speaker_embedding` | Owner biometric embedding (also wrapped in Android Keystore) |

## What NEVER leaves the device

- Raw audio recordings (unless user opts in for training)
- Full contact book (only queried contact is sent per request)
- Banking SMS content
- OTPs, passwords, PINs
- Location coordinates (only boolean "location used" logged)

See `SECURITY-MODEL.md` for threat model.

## Retention

Default retention policies (user-configurable in Privacy Dashboard):

| Data type | Default | Options |
|-----------|---------|---------|
| Voice audio | Not stored | Opt-in (training) |
| Transcripts | 30 days rolling | 7d / 90d / 1yr / never |
| Conversation memory | Until user deletes | User-controlled |
| Contact nicknames | Until user deletes | User-controlled |
| Speaker embedding | Until owner-mode disabled | User-controlled |
| Crash / action logs | 90 days | Industry standard |
| Analytics events | 13 months (anonymized after 30 days) | Opt-out |

## Sync model

- Writes: client writes to SQLite first (optimistic), queues a sync task
- Sync: Supabase Realtime subscription for multi-device consistency (Pro)
- Conflicts: last-write-wins per row (acceptable given single-user-per-account model)
