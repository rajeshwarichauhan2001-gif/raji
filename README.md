# Raji

Claude-powered voice assistant for **Android + Windows + Linux**. Talks and
executes real-world actions — Hindi, English, Hinglish.

> This repository is the **client monorepo** (KMP + Compose Multiplatform).
> The backend proxy, infra, and docs live elsewhere and are added by other
> streams of work. Do not create `backend/`, `.github/`, or `docs/` here — they
> are owned by different agents.

---

## Current state

**Phase 0 — Foundation.** This is a scaffold. It compiles and runs a
"Namaste Raji" greeting. No feature code yet. See
`raji-research/MASTER-ARCHITECTURE.md` for the consolidated architecture
and `raji-research/RAJI-CONTEXT.md` for the locked decisions (D-01 … D-25).

---

## Modules

```
raji/
  settings.gradle.kts
  build.gradle.kts
  gradle.properties
  gradle/libs.versions.toml        # version catalog (single source of truth)
  shared/                          # :shared — business logic (KMP)
  composeApp/                      # :composeApp — shared Compose UI
  androidApp/                      # :androidApp — Android entry point (Lite + Pro)
  desktopApp/                      # :desktopApp — Compose Desktop (Windows + Linux)
```

Dependency graph is strictly one-directional
(see `raji-research/terminal-1-frameworks/project-structure.md` §4):

- `:shared` depends on nothing internal.
- `:composeApp` depends on `:shared`.
- `:androidApp` and `:desktopApp` depend on `:composeApp` (+ `:shared`).
- `:androidApp` and `:desktopApp` never depend on each other.

---

## Prerequisites

- **JDK 17** — `java -version` must show `17.x`. Recommend Temurin or Zulu.
- **Android Studio Ladybug (2024.2.1)** or newer — for Android module.
- **Git** — any recent version.
- **Gradle** — do NOT install separately; use the wrapper (`./gradlew`).

For desktop builds:

- **Windows:** Windows 10+ with MSVC build tools for any future native glue.
- **Linux:** Any mainstream distro with ALSA / PulseAudio / PipeWire.

Wake-word / STT model weights are **not** shipped in the repo. They download
on first use per `raji-research/PERFORMANCE-BUDGET.md` (APK ≤22MB target).

---

## Quick start

```bash
# clone
git clone git@github.com:techinfinity/raji.git
cd raji

# build Android Lite debug (fastest sanity check)
./gradlew :androidApp:assembleLiteDebug

# build Android Pro debug (full permissions; sideload track)
./gradlew :androidApp:assembleProDebug

# run desktop (Windows or Linux)
./gradlew :desktopApp:run

# run all unit tests across modules
./gradlew test
```

### Android build flavors (D-06 / D-19)

| Flavor | Application ID              | Track        | Permissions                                  |
|--------|-----------------------------|--------------|----------------------------------------------|
| lite   | `io.techinfinity.raji.lite` | Play Store   | Minimal. No CALL_PHONE, SEND_SMS, QUERY_ALL_PACKAGES, no AccessibilityService. |
| pro    | `io.techinfinity.raji.pro`  | Sideload     | Full. CALL_PHONE, SEND_SMS, QUERY_ALL_PACKAGES, AccessibilityService. |

Different application IDs mean both can be installed side-by-side — deliberate,
per `raji-research/expert-knowledge/03-play-store-policy.md`.

---

## Tech stack

| Layer       | Choice                                   |
|-------------|------------------------------------------|
| Language    | Kotlin 2.x                               |
| UI          | Compose Multiplatform 1.7+               |
| Build       | Gradle 8.x + version catalog             |
| Android     | Android Gradle Plugin 8.x, JDK 17 target |
| Namespace   | `io.techinfinity.raji`                   |
| Min SDK     | 26 (Android 8.0 Oreo)                    |
| Target SDK  | 35 (Android 15)                          |

Full stack table: `raji-research/MASTER-ARCHITECTURE.md` §1.

---

## Design tokens

Colors and typography are stubbed in
`composeApp/src/commonMain/kotlin/io/techinfinity/raji/ui/theme/Theme.kt`.
Source of truth: `raji-research/UI-UX-PRINCIPLES.md`.

- Dark mode **default** (78% of Indian users prefer; OLED battery).
- Primary **deep violet** `#6750A4`, accent **warm gold** `#FFD166`,
  surface **near-black** `#0E0E11`.
- Material 3 Expressive.
- 60fps spring motion, not linear tweens.

---

## License

Apache 2.0 — see `LICENSE`.

---

## Contact

developers@techinfinity.io
