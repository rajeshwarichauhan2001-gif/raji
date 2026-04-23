# System Architecture — Overview

**Product:** Raji — a voice-first AI assistant for Android, Windows, and Linux. Hindi/English/Hinglish native. Integrates with Claude for reasoning and a broad set of device + IoT backends for action.

---

## Module map

```
raji/
├── shared/                  Kotlin Multiplatform business logic
├── composeApp/              Shared Compose UI (Material 3 theme + components)
├── androidApp/              Android entry point (lite + pro flavors)
├── desktopApp/              Compose Desktop entry (Windows + Linux)
├── backend/                 Supabase: migrations + Edge Functions
├── .github/workflows/       CI/CD pipelines
└── docs/                    Architecture docs
```

Companion native binaries (separate repos or modules, Phase 4):
- `raji-win-agent/` — C# .NET 8 + FlaUI for deep Windows automation
- `raji-linux-agent/` — Rust + zbus for D-Bus and Linux system control

---

## Runtime architecture

```
┌──────────────────────────────────────────────────────────────┐
│ USER DEVICE (Android / Win / Linux)                          │
│                                                              │
│  Mic ─▶ Wake-word ─▶ VAD + Speaker ID ─▶ STT (streaming)   │
│                                               │              │
│                                               ▼              │
│                    ┌─────────────────────────────────┐      │
│                    │ Intent Router (in :shared)      │      │
│                    │  rules → Haiku classifier → main│      │
│                    └──────────┬──────────────────────┘      │
│                               │                              │
│          ┌────────────────────┼────────────────────┐        │
│          ▼                    ▼                    ▼        │
│   Device tool            Claude backend       IoT tool      │
│   (Intents / A11y)      (streamed via our    (Google Home,  │
│                           backend proxy)      SmartThings,  │
│                                               Tuya, HA...)  │
│                               │                              │
│                               ▼                              │
│                            TTS ─▶ Speaker                    │
└──────────────────────────────────────────────────────────────┘
                │                       │
                ▼                       ▼
      ┌─────────────────┐     ┌─────────────────────┐
      │ Supabase Mumbai │     │ Third-party APIs    │
      │  - Auth (JWT)   │     │  - Anthropic Claude │
      │  - Postgres +   │     │  - Sarvam STT       │
      │    pgvector     │     │  - Azure TTS        │
      │  - Realtime     │     │  - Google Home      │
      │  - Edge Fns     │     │  - Tuya / Hue / ... │
      └─────────────────┘     └─────────────────────┘
```

---

## Layer responsibilities

### `:shared` (KMP common)
- Voice pipeline state machine (D-20)
- Intent router (rules → Haiku → main Claude)
- Claude API client (streaming)
- Conversation memory API (SQLite + sqlite-vss)
- Device command dispatcher (abstract — platform adapters in platform-specific source sets)
- IoT unified device model and backend router (single `device_control` tool — D-21)

### `:composeApp`
- Theme tokens (Material 3 Expressive, dark default, dynamic color — D-24)
- Screens: Home (waveform visualizer), Onboarding, Memory, Devices, Settings
- Component library (Button, Card, WaveformVisualizer, ConsentSheet, OemChecklist)
- Navigation (single-activity pattern)

### `:androidApp`
- Activity + ForegroundService(`microphone`) + AccessibilityService (pro flavor only)
- OEM compatibility module (heartbeat + self-recovery per expert-knowledge/02)
- Lite vs Pro build flavors via `manifestPlaceholders` (D-19)

### `:desktopApp`
- Compose Desktop window, tray icon, global hotkey
- Bridges to native Windows / Linux agents for system automation

### `backend/`
- Anthropic + Sarvam API proxying (never expose keys to client — D-09)
- Auth, rate limiting, audit logging
- User data (conversations, memories, contacts, IoT device registry)
- Row Level Security (users can only see their own data)

---

## Key runtime flows

### 1. Voice conversation
`mic → wake → VAD → speaker-ID → STT stream → intent classifier → Claude stream → TTS stream → speaker`

End-to-end target: P50 under 1.8s, P95 under 2.8s (D-11).

### 2. Device command on Android (Pro)
`voice → intent router classifies as device_command → client-side tool executor → AccessibilityService (if UI automation) or Intent (if simpler) → confirmation TTS`

### 3. IoT command
`voice → Claude single device_control tool → deterministic backend router → (Matter / Google Home / Tuya / HA / BroadLink) → state poll → confirmation TTS`

Per D-22: optimistic execution with lazy confirmation for sub-2s P50.

---

## Source traceability

Every architecture decision here can be traced to one of:
- `raji-research/RAJI-CONTEXT.md` (decisions D-01 through D-25)
- `raji-research/MASTER-ARCHITECTURE.md` (consolidation)
- `raji-research/expert-knowledge/NN-*.md` (12 production docs)
- `raji-research/terminal-N-*/` (5 research streams)

For new contributors: start at `RAJI-CONTEXT.md` for fast onboarding.
