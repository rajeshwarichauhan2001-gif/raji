# Security Model

Raji holds keys to a user's digital life: contacts, messages, mic, smart home, accounts. Security posture is therefore **non-negotiable**.

Full detail: `raji-research/expert-knowledge/05-security-privacy.md` and `09-ai-safety-guards.md`.

---

## Threat model (summary)

| Actor | Goal | Primary defense |
|-------|------|-----------------|
| Script kiddie | Extract API keys from APK | Backend proxy — no keys in client |
| Competitor | Scrape endpoints | Authenticated endpoints + rate limits |
| Malicious insider | Exfiltrate user data | Role isolation, audit logging, RLS |
| Voice-prompt injector | Unauthorized action via played audio | Speaker biometrics + confirmation gate for destructive actions |
| Thief with phone | Money transfer / OTP leak | Biometric (fingerprint) second factor for sensitive actions |
| Content-injector via data | Instructions hidden in SMS/email Raji reads | Content sanitization + `<untrusted_content>` wrapping in prompts |

---

## Key controls

### 1. API key isolation
Client never holds Anthropic / Sarvam / TTS keys. All third-party calls go through our backend proxy (`backend/supabase/functions/*-proxy/`). Keys live in Supabase Function Secrets.

### 2. Auth
- Supabase Auth, JWT lifetime 15 min, refresh token 30 days with rotation
- Tokens stored in Android Keystore / iOS Keychain / DPAPI / libsecret
- Session revocation list accessible from in-app settings

### 3. Data at rest
- Device: SQLite with SQLCipher (AES-256), speaker embedding in Keystore
- Cloud: Postgres transparent disk encryption, backups encrypted + cross-region
- Logs: PII-scrubbed at write time, encrypted at rest, 90 days retention

### 4. Data in transit
- TLS 1.3 minimum
- Certificate pinning for our backend (prevents user-installed CA MITM)
- Backup pin; rotate quarterly

### 5. Speaker biometrics
- SpeechBrain ECAPA-TDNN embedding at enrollment; wrapped in Keystore
- Cosine similarity threshold 0.8 by default, user-tunable
- Owner-only mode refuses wake-word from non-owner voices
- NEVER sole gate for destructive actions — always paired with fingerprint/face

### 6. Destructive action gating
Before executing any action that sends messages, initiates calls, moves money, or changes security settings: client-side guard requires explicit user confirmation + biometric (fingerprint/face), regardless of voice match.

### 7. Content sanitization
Before sending any user-provided content (SMS read-back, email summary, notification digest) to Claude: wrap in `<untrusted_content>` tags. System prompt trains Claude to never follow instructions inside those tags.

### 8. Rate limits
Per-user per-action-class limits (messages, calls, IoT toggles, etc.). Spike detection triggers a pause + push notification asking the user to confirm activity.

### 9. Audit log
Every sensitive action (SMS sent, call initiated, money transfer nav, consent change) written to `action_log` table. 90-day retention. User-accessible via Privacy Dashboard.

### 10. Kill switches
Server-side feature flags can disable any tool class within minutes if a harm pattern is detected. Fetched on app launch + every 5 min; pushed via silent notification for urgent issues.

---

## Code-level hardening

- Android: R8 + ProGuard aggressive shrinking on release
- Root / jailbreak detection → refuse sensitive features on compromised devices
- Signature verification → app exits if APK signature differs from known-good
- Dependencies: lockfile committed, Dependabot weekly, Trivy + CodeQL in CI
- Release signing: Play App Signing (Lite); EV cert (Windows MSIX via Azure Key Vault); GPG (Linux)

---

## Privacy controls (user-facing)

- **Privacy Dashboard** — view every piece of data Raji stores, per-category
- **One-tap data export** — JSON + CSV of everything
- **One-tap deletion** — nuclear wipe with 2-factor confirmation
- **Per-permission revoke** — each sensitive permission has a revoke button with Raji telling the user what will stop working
- **Retention override** — tighter than defaults if user wishes

---

## Incident response

Playbook drafted before launch. Key commitments:
- Detection-to-notification target: under 72 hours (DPDP requirement)
- Pre-drafted user notification templates (translated)
- Pre-selected forensic vendor
- Quarterly tabletop exercises

---

## Pre-launch security checklist

Before Phase 1 Play Store submission:

- [ ] All API keys server-side only
- [ ] TLS 1.3 with pinning
- [ ] Keystore-backed local sensitive data
- [ ] SQLCipher on conversation DB
- [ ] Root/jailbreak detection
- [ ] R8/ProGuard for release
- [ ] Code signing for all release artifacts
- [ ] Speaker biometrics for owner-only mode
- [ ] Biometric second-factor for sensitive actions
- [ ] Prompt injection mitigations in system prompt + client filters
- [ ] Audit logging live, PII-scrubbed
- [ ] Incident response playbook + templates
- [ ] Third-party penetration test
- [ ] Bug bounty program spec drafted
