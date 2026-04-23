# Phase 0 Runbook — Raji

**Audience:** The first engineer (you) setting up Raji from a clean Windows machine.
**Goal:** Reach "empty-but-green CI + Hello Raji stub installs on Android emulator + Supabase backend live in Mumbai" by the end of this runbook.
**Total wall-clock time:** 6-9 hours of active work, spread over 3-5 days (because external account reviews are async).

See [MASTER-ARCHITECTURE.md](../../raji-research/MASTER-ARCHITECTURE.md) Section 4 "Phase 0" for the why. This doc is the how.

---

## Preflight checklist (15-20 min)

Install these before touching any step. Everything is free / Windows-native.

| Tool | Version | Why | Install command |
|------|---------|-----|-----------------|
| **JDK 17** | 17.0.10+ (Temurin) | KMP + AGP 8.x require 17 | `winget install EclipseAdoptium.Temurin.17.JDK` |
| **Android Studio** | Koala Feature Drop (2024.1.2+) | AGP 8.x, KMP plugin | Download from developer.android.com/studio |
| **Git for Windows** | 2.44+ | SCM + bash shell | `winget install Git.Git` |
| **Supabase CLI** | 1.200+ | Local dev + deploy migrations/functions | `scoop install supabase` OR `npm i -g supabase` |
| **Deno** | 1.46+ | Supabase Edge Functions runtime | `winget install DenoLand.Deno` |
| **Node.js LTS** | 20+ | Ancillary tooling (ktlint-disable, gitleaks wrapper) | `winget install OpenJS.NodeJS.LTS` |
| **GitHub CLI** | 2.50+ | PR creation + secret management | `winget install GitHub.cli` |

### Verify

```bash
java -version           # openjdk 17.x
gradle --version        # will be supplied by wrapper; not strictly required globally
adb --version           # from Android Studio SDK
supabase --version      # 1.200+
deno --version          # 1.46+
gh auth status          # logged in
```

### Windows-specific gotchas

- **Long path support:** `git config --system core.longpaths true` — Gradle + KMP paths easily exceed 260 chars.
- **Line endings:** `git config --global core.autocrlf input` (we use LF in repo; Windows tools handle CRLF locally).
- **Defender exclusion:** Add `C:\Users\hp\raji\` and `~\.gradle\` to Defender exclusions — cuts cold build time ~40%.
- **ANDROID_HOME:** After Android Studio install, set `ANDROID_HOME=C:\Users\hp\AppData\Local\Android\Sdk` in System env vars. Add `%ANDROID_HOME%\platform-tools` to PATH.
- **JAVA_HOME:** `C:\Program Files\Eclipse Adoptium\jdk-17.0.10.7-hotspot\` (or whatever winget installed).

---

## Step 1 — External account setup (60-120 min active; 1-6 weeks async review)

Per D-09 and [MASTER-ARCHITECTURE.md Section 5](../../raji-research/MASTER-ARCHITECTURE.md), these are on the critical path. **Submit them on Day 1.** Google OAuth verification alone is 6 weeks.

| # | Account | Action | Time | Blocks |
|---|---------|--------|------|--------|
| 1 | **Anthropic Console** | Sign up at console.anthropic.com, add payment, create API key named `raji-dev-2026-04`. **Do NOT commit this key anywhere.** | 10 min | Step 4 |
| 2 | **Supabase** | Sign up at supabase.com, create new project `raji-prod`, **region = Mumbai (ap-south-1)** (D-10, DPDP). Record Project URL, anon key, service role key into a password manager. | 15 min | Step 3 |
| 3 | **GitHub org `techinfinity`** | Create org, invite collaborators, create private repo `techinfinity/raji`. Enable branch protection on `main` (require PR + 1 review + passing CI). | 15 min | Step 6 |
| 4 | **Google Play Console** | developer@ email, sign up, pay **₹2000 one-time** registration fee. Identity verification can take 48h. | 15 min (+48h review) | Play Store submission (Phase 1 end) |
| 5 | **Google Cloud Console** | Create project `raji-prod`. Enable Google Home API + OAuth consent screen. **Submit OAuth verification on Day 1 — 6 week SLA.** | 30 min (+6 weeks review) | Phase 2 IoT |
| 6 | **Domain `raji.app`** | Register via Cloudflare / Porkbun (~₹1200/yr). Add DNS + email (Google Workspace or Zoho) — privacy policy will be hosted here. | 20 min | Play Store submission |
| 7 | **Sarvam AI** | Email `support@sarvam.ai` for commercial API access (Saaras v2, India STT). No self-serve as of 2026-04. Reply usually within 2-3 business days. | 5 min (+2-3 days) | Phase 1 Week 1 |
| 8 | **DigiCert / Sectigo** (optional, defer to Phase 4) | Start EV code-signing cert procurement only when Windows companion work begins. | — | Phase 4 |

**Save all keys to your local password manager. You will paste them into Supabase secrets in Step 3; they never go into git.**

---

## Step 2 — Local clone + first build (20-30 min)

```bash
# 1. Clone
cd C:\Users\hp
git clone git@github.com:techinfinity/raji.git
cd raji

# 2. Let Android Studio materialize the wrapper + SDK on first open
#    (Open the `raji` folder in Android Studio. It will sync Gradle automatically.)
#    OR run from command line:

./gradlew --version      # downloads Gradle distribution first time (~2 min)
./gradlew tasks          # should enumerate tasks for all modules
./gradlew :composeApp:assembleDebug  # first build: 5-10 min; warm: <60s
```

### Expected output

```
BUILD SUCCESSFUL in 8m 12s
47 actionable tasks: 47 executed
```

If you get `UnsupportedClassVersionError`, JDK is <17. Fix `JAVA_HOME` and re-run.

If you get `SDK location not found`, create `local.properties` at repo root:

```properties
sdk.dir=C\:\\Users\\hp\\AppData\\Local\\Android\\Sdk
```

**Do NOT commit `local.properties`.** It is already in `.gitignore`.

---

## Step 3 — Supabase project setup (30-45 min)

```bash
cd C:\Users\hp\raji\backend\supabase

# 1. Login
supabase login

# 2. Link to the remote project you created in Step 1
supabase link --project-ref <your-project-ref>
# (find project-ref in Supabase dashboard URL: app.supabase.com/project/<ref>)

# 3. Apply initial migration (creates tables per docs/architecture/DATA-MODEL.md)
supabase db push

# 4. Deploy edge functions (Anthropic proxy, Sarvam proxy)
supabase functions deploy claude-proxy
supabase functions deploy sarvam-proxy

# 5. Set secrets (these live ONLY in Supabase; never in git)
supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
supabase secrets set SARVAM_API_KEY=...
supabase secrets set AZURE_TTS_KEY=...   # can be placeholder for Phase 0

# 6. Verify
supabase functions list
supabase secrets list   # shows keys (redacted values)
```

### Expected output of `supabase db push`

```
Applying migration 20260424000000_init.sql...
Finished supabase db push.
```

If you see `permission denied for schema public`, your DB password is wrong — reset in dashboard and re-run `supabase link`.

---

## Step 4 — Anthropic key setup + smoke test (10 min)

The Anthropic key is already in Supabase secrets from Step 3. Now verify the proxy works end-to-end.

```bash
# Test via cURL (replace <project-ref> and <anon-key>)
curl -X POST "https://<project-ref>.supabase.co/functions/v1/claude-proxy" \
  -H "Authorization: Bearer <anon-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"claude-haiku-4-5","messages":[{"role":"user","content":"say hi in hinglish"}]}'
```

### Expected response

```json
{"content":[{"type":"text","text":"Namaste! Kaise ho aap?"}],"usage":{"input_tokens":12,"output_tokens":8}}
```

If you get `401 Unauthorized`, the anon key is wrong. If you get `500 missing ANTHROPIC_API_KEY`, re-run Step 3 #5.

**Never put the Anthropic key in the Android app.** Per D-09, only the backend knows it. The client app only talks to Supabase.

---

## Step 5 — Android Studio + run Lite flavor on emulator (30-45 min)

1. Open `C:\Users\hp\raji` in Android Studio.
2. Wait for Gradle sync (5 min first time). Ignore "Unresolved reference" warnings during sync.
3. Tools → Device Manager → Create Device → **Pixel 8a, API 34 (Android 14)**. Wait for image download (10 min).
4. In the flavor dropdown (next to run button), select `liteDebug`.
5. Click Run. First install: 2-3 min.

### Expected

- App installs with package ID `io.techinfinity.raji.lite`.
- Launches to "Hi, Raji hoon" splash screen.
- Cold start <500ms (verify in Logcat: filter `ReportFullyDrawn`).

### Run the Pro flavor

```bash
./gradlew :androidApp:assembleProDebug
# Install manually (Pro never goes through Play Store):
adb install -r androidApp/build/outputs/apk/pro/debug/androidApp-pro-debug.apk
```

Package ID: `io.techinfinity.raji.pro`. Both flavors can co-exist on the same device (D-19).

---

## Step 6 — First commit + first PR (20-30 min)

Conventions — see [CONTRIBUTING.md](../CONTRIBUTING.md) for the long form.

### Branch

```bash
git checkout -b feat/phase-0-docs
```

Naming: `<type>/<kebab-summary>` where type is `feat | fix | chore | docs | test | refactor | perf`.

### Commit

We follow **Conventional Commits**. Examples:

```
feat(voice): add openWakeWord integration scaffold
fix(android): OEM autostart onboarding loop on Xiaomi MIUI 14
chore(ci): path-scope android workflow to reduce cost
docs(readme): Hinglish quickstart section add kiya
```

Keep subject ≤72 chars. Body wraps at 100. Hinglish body text is fine (audience is Indian).

### PR

```bash
git push -u origin feat/phase-0-docs
gh pr create --fill
```

The PR template will auto-populate. Fill in:
- What changed + why (2-4 bullets)
- Testing done (manual? CI? emulator?)
- Screenshots if UI
- Breaking changes? (almost always "No" during Phase 0)

---

## Step 7 — CI green on first PR (10-20 min to react)

The first PR triggers 4 GitHub Actions workflows (path-scoped per D-18):

| Workflow | Runs when | Typical duration |
|----------|-----------|------------------|
| `android-ci.yml` | Anything under `androidApp/`, `composeApp/`, `shared/` | 8-12 min |
| `backend-ci.yml` | Anything under `backend/` | 2-4 min |
| `lint.yml` | Always | 2-3 min |
| `gitleaks.yml` | Always | 30s |

All four must be green before merge (branch protection enforces this).

### Typical first-PR failures + fixes

| Failure | Fix |
|---------|-----|
| `ktlint: 3 files need formatting` | `./gradlew ktlintFormat && git commit -am "chore: ktlint"` |
| `detekt: MagicNumber` | Refactor or suppress with `@Suppress("MagicNumber")` + reason |
| `gitleaks: AWS key detected` | You committed a secret. `git reset HEAD~1`, rotate the key, re-commit without it. **Rotate means regenerate — don't just remove from the diff.** |
| `android lint: MissingPermission` | Declare in `AndroidManifest.xml` or gate the code behind a runtime check |
| CI hits 10min timeout | Usually Gradle cache miss on first run. Push an empty commit to retry: `git commit --allow-empty -m "ci: retry"` |

---

## Troubleshooting

### Windows-specific

| Symptom | Cause | Fix |
|---------|-------|-----|
| `Could not create task ':shared:...'` with long-path error | Windows 260-char limit | `git config --system core.longpaths true`; restart shell |
| Gradle daemon crashes with OOM | Default heap 512MB too small for KMP | Edit `gradle.properties`: `org.gradle.jvmargs=-Xmx4g -XX:MaxMetaspaceSize=1g` |
| `adb: no devices/emulators found` | USB debugging off OR emulator not started | Start emulator from AVD Manager OR enable Developer Options on phone |
| Very slow build on Windows Defender | Real-time scan on .gradle folder | Add `C:\Users\hp\.gradle` + `C:\Users\hp\raji` to Defender exclusions |
| Supabase CLI `tls: first record does not look like a TLS handshake` | Corporate proxy | `supabase --debug` + set `HTTPS_PROXY` env var |

### OEM-specific testing (Phase 1+ concern, but know now)

Per `expert-knowledge/02-android-oem-landmines.md`, the Lite build will install fine on any emulator but will be **silently killed** on Xiaomi / OPPO / Vivo physical devices unless the user completes their per-OEM autostart ritual. In Phase 0 this doesn't matter (we haven't built the foreground service yet); from Phase 1 onward, test on a physical Redmi / OPPO device before every release.

### Supabase edge function local dev

```bash
cd backend/supabase
supabase functions serve claude-proxy --env-file ./.env.local
# Proxies against your remote DB; Anthropic key comes from .env.local (gitignored)
```

### Emulator audio

The Android emulator's microphone needs `-use-host-audio` to capture your laptop mic. In AVD Manager → Advanced → Microphone: set "Virtual microphone uses host audio input" = yes. Without this, wake-word testing is impossible on emulator — use a physical device.

---

## Time estimates — summary

| Step | Active time | Wait/review |
|------|-------------|-------------|
| Preflight | 15-20 min | — |
| Step 1 external accounts | 60-120 min | **Google OAuth 6 weeks**, Play ID 48h, Sarvam 2-3 days |
| Step 2 clone + build | 20-30 min | — |
| Step 3 Supabase | 30-45 min | — |
| Step 4 Anthropic test | 10 min | — |
| Step 5 Android Studio run | 30-45 min | Emulator image 10 min |
| Step 6 first PR | 20-30 min | — |
| Step 7 CI green | 10-20 min | 10-15 min per CI run |
| **Total** | **~4-5 hours** | **6 weeks gating Phase 2** |

**Definition of Phase 0 done:** Hello-Raji stub runs on emulator, Supabase proxy returns Claude responses, first PR merged green. Everything else is Phase 1.

---

## Related docs

- [CONTRIBUTING.md](../CONTRIBUTING.md) — branch + commit + review conventions
- [docs/architecture/OVERVIEW.md](architecture/OVERVIEW.md) — the system you're setting up
- [docs/architecture/DATA-MODEL.md](architecture/DATA-MODEL.md) — schema applied in Step 3
- [docs/architecture/SECURITY-MODEL.md](architecture/SECURITY-MODEL.md) — why Anthropic key stays server-side
- [docs/LAUNCH-CHECKLIST.md](LAUNCH-CHECKLIST.md) — what Phase 0 feeds into
