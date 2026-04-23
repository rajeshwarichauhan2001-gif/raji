# Contributing to Raji

Thanks for taking a look. Raji is a Claude-powered voice assistant for India-first Android (with Windows + Linux companions coming in later phases). This guide is short on purpose — the bar is that any engineer can make a clean PR in <30 minutes of reading this + the [PHASE-0-RUNBOOK](docs/PHASE-0-RUNBOOK.md).

> New to the project? Read [docs/PHASE-0-RUNBOOK.md](docs/PHASE-0-RUNBOOK.md) first — it walks you from empty laptop to green PR. Then come back here for conventions.

---

## TL;DR

1. Branch: `feat/short-summary` (or `fix/`, `chore/`, `docs/`, `test/`, `refactor/`, `perf/`)
2. Commit: [Conventional Commits](https://www.conventionalcommits.org/) — `feat(voice): wake-word ko integrate kiya`
3. Code: `./gradlew ktlintFormat detekt lint` before pushing
4. Tests: `./gradlew test` for `:shared`; instrumented tests for Android-specific flows
5. PR: fill the template, keep diffs <500 lines where possible

---

## Branch naming

`<type>/<kebab-case-summary>`

| Type | Use for | Example |
|------|---------|---------|
| `feat/` | New user-visible feature | `feat/whatsapp-accessibility-playbook` |
| `fix/` | Bug fix | `fix/xiaomi-foreground-service-restart` |
| `chore/` | Infra, tooling, deps, CI | `chore/bump-kotlin-2.1.20` |
| `docs/` | Docs-only | `docs/phase-0-runbook-windows-paths` |
| `test/` | Tests only | `test/intent-router-hinglish-coverage` |
| `refactor/` | No behaviour change | `refactor/extract-stt-streaming-client` |
| `perf/` | Measurable perf work | `perf/cold-start-below-500ms` |

Branch name is also the PR title scope — keep it short.

**Never** commit directly to `main`. Branch protection enforces PR + review + green CI.

---

## Commit message convention

We use [Conventional Commits 1.0](https://www.conventionalcommits.org/).

```
<type>(<scope>): <subject in imperative, lowercase, no period>

<optional body — what + why. Wrap at 100 cols.>

<optional footer — breaking change notes, issue refs>
```

### Allowed `type` values

Same as branch types above: `feat`, `fix`, `chore`, `docs`, `test`, `refactor`, `perf`. Plus `revert` and `build`.

### Scope suggestions

`voice`, `ai`, `device`, `iot`, `android`, `desktop`, `backend`, `shared`, `ci`, `infra`, `ui`, `perf`, `security`.

### Good examples (Hinglish body is fine — that's our audience)

```
feat(voice): openWakeWord integrate kiya with Silero VAD

Wake-word engine runs in foreground service `microphone` type per D-05.
Battery target <5%/hr per PERFORMANCE-BUDGET.md — measured 3.2% on Pixel 8a.
Xiaomi OEM module autostart hint still pending (separate PR).
```

```
fix(android): whatsapp send button tap on MIUI 14 crash fix

Accessibility Service AccessibilityNodeInfo was being recycled before
tap dispatch. Hold reference until after performAction returns. Repro
only on MIUI 14 Global; POCO + stock Android not affected.

Refs: #47
```

```
chore(ci): path-scope android workflow (50% cost cut)

Only run the android-ci workflow when androidApp/**, composeApp/**,
shared/** change. Backend PRs skipped android build => median PR CI
time 12m -> 4m.
```

```
perf(startup): cold start 820ms -> 430ms via Baseline Profile

BaselineProfile generated on Pixel 8a API 34. Verified -47% cold
start on Redmi Note 13 (818ms -> 432ms).

BREAKING CHANGE: minSdk bumped 24 -> 26 for Baseline Profile support.
```

### Bad examples (will be nitpicked)

- `update stuff` — no type, no subject
- `fix bug` — which bug? (use scope + descriptive subject)
- `Feat: Added WhatsApp integration.` — capital F, trailing period, past tense
- `WIP` — never merge WIP commits; squash them

---

## Pull request expectations

Every PR must fill the template at [.github/PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md). Required sections:

1. **What + why** (2-4 bullets) — not a restatement of the diff; the motivation
2. **Testing done** — "unit: N new, N existing pass", "manual: tested on Pixel 8a API 34", "CI: all green"
3. **Screenshots / video** for any UI change (use macOS/Win screenshot tools; attach or link)
4. **Breaking changes** — usually No. If Yes, call out migration steps.
5. **Related decisions** — link D-XX from [docs/architecture/DECISIONS.md](docs/architecture/DECISIONS.md) if the PR implements one

### PR size

Target <500 lines of diff. PRs >1000 lines will be asked to split (except for lockfile / generated code bumps). Breaking a feature across 3 PRs is normal and encouraged.

### Reviewers

- `:shared` / `:composeApp` changes → tag a KMP reviewer
- `androidApp/` + Accessibility Service work → tag the Android lead
- `backend/` → tag the backend owner
- Anything touching auth, keys, or secrets → tag **security reviewer mandatory**, no exceptions

### Merge strategy

Squash merge to `main`. The PR title becomes the squash commit subject, so title must also follow Conventional Commits.

---

## Code style

### Kotlin (app + shared)

- **ktlint** (bundled in Gradle) for formatting. Run `./gradlew ktlintFormat` before pushing.
- **detekt** for static analysis. Config at [detekt.yml](detekt.yml) (once added in Phase 0 Week 1).
- **Compose** naming: composables PascalCase verbs/nouns (`VoiceWaveform`, `PermissionScreen`); state hoisting mandatory; no `remember` leaks across config changes.
- **No `!!`** — the linter will fail it. Use `requireNotNull` with a message.
- **KDoc on all `public` APIs in `:shared`** — cross-platform contracts must be documented.

### Kotlin / TypeScript (backend)

- Supabase Edge Functions in Deno/TypeScript. Use `deno fmt` + `deno lint`.
- Keep functions <200 lines; split by concern (auth, proxy, rate-limit).

### SQL (migrations)

- One migration per concern. Never edit a migration after it's merged — write a follow-up.
- Migration filename: `YYYYMMDDHHMMSS_snake_case_description.sql`.
- Include `-- up` and `-- down` sections where feasible.

### Commit hygiene

- No commented-out code (use `git` history).
- No `TODO` without an issue link: `// TODO(#47): handle WhatsApp web variant`.
- No console.log / println in production paths — use the structured logger.

---

## Testing expectations

Per [PERFORMANCE-BUDGET.md](../raji-research/PERFORMANCE-BUDGET.md) and [MASTER-ARCHITECTURE.md](../raji-research/MASTER-ARCHITECTURE.md) we hold a high bar on reliability — 99.5%+ crash-free sessions at launch.

### Minimum per PR

| Change type | Required |
|-------------|----------|
| New logic in `:shared` | Unit test with ≥80% branch coverage of new code |
| New Android Activity / Service | Instrumented test for happy path + 1 edge case |
| New backend endpoint | Integration test hitting local Supabase stack |
| New Claude prompt / tool | Eval fixture with ≥10 Hinglish + English samples |
| Perf-sensitive change | Benchmark delta reported in PR body |
| UI-only | Manual screenshots + Compose Preview |
| Docs-only | None (but run `markdown-link-check`) |

### How to run tests

```bash
./gradlew test                                  # shared + backend unit tests
./gradlew :androidApp:connectedLiteDebugAndroidTest  # instrumented (needs emulator)
cd backend/supabase && deno test functions/     # edge function tests
```

### CI gates (branch protection)

- All tests green
- ktlint + detekt + android lint clean
- APK size delta <500 KB (enforced per PERFORMANCE-BUDGET.md)
- No secrets detected by gitleaks
- CodeQL + Trivy green on main branch nightly

---

## Reporting bugs + requesting features

### Filing a bug

Open an issue using the **Bug report** template. Sample Hinglish titles we like:

- `Xiaomi MIUI 14 pe wake-word 10 min baad band ho jata hai`
- `WhatsApp bhejne pe "aa raha hoon" ki jagah "aa raha hu" type ho raha hai`
- `Pro APK download fail on Jio 4G; WiFi pe chalta hai`

Required fields:
- Device + OS version (e.g., "Redmi Note 13, MIUI 14.0.5, Android 14")
- Raji version + flavor (Lite / Pro) + build number
- Repro steps (numbered)
- Expected vs actual
- Logs (sanitized — no contact names, no message contents)

### Requesting a feature

Open an issue with the **Feature request** template. Sample Hinglish titles:

- `Feature: Spotify ke saath JioSaavn bhi support kar lo`
- `Feature: Auto-reply mode jab meeting mein hoon`
- `Feature: Alexa ke jaisa routines (subah alarm → news → music)`

**Important:** check [FEATURES-100.md](../raji-research/FEATURES-100.md) first — your feature may already be on the roadmap. If it is, comment "+1" on the existing issue rather than opening a new one. If it's genuinely new, say so + why it matters.

### Security bugs

**Do not file security bugs as public issues.** Read [SECURITY.md](SECURITY.md) and email `security@techinfinity.io` instead.

---

## Code of Conduct

This project follows the [Contributor Covenant 2.1](CODE_OF_CONDUCT.md). Be kind, be precise, be fast — Indian developers' trademark.

---

## Questions?

- Async: open a Discussion on the repo
- Urgent: email `developers@techinfinity.io`
- Security: email `security@techinfinity.io` (see [SECURITY.md](SECURITY.md))
