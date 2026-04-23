# Architecture Decision Records (ADRs)

This is an INDEX of decisions. Each row points to where the full rationale lives — in `raji-research/RAJI-CONTEXT.md` (single source of truth) or in a dedicated research doc.

| ID | Decision | Status | Date | Source |
|----|----------|--------|------|--------|
| D-01 | Name: "Raji" | Locked | 2026-04-24 | RAJI-CONTEXT |
| D-02 | Target platforms: Android + Windows + Linux | Locked | 2026-04-24 | RAJI-CONTEXT |
| D-03 | iOS dropped from scope | Locked | 2026-04-24 | Platform restriction analysis |
| D-04 | Customizable wake word — defer custom training to Phase 1.1 | Locked | 2026-04-24 | T2 flag accepted |
| D-05 | Android-first architecture | Locked | 2026-04-24 | RAJI-CONTEXT |
| D-06 | Dual-track distribution: Lite (Play Store) + Pro (sideload) | Locked | 2026-04-24 | expert-knowledge/03 |
| D-07 | Languages Phase 1: Hindi + English + Hinglish | Locked | 2026-04-24 | RAJI-CONTEXT |
| D-08 | Claude as reasoning engine (Opus 4.7 / Sonnet 4.6 / Haiku 4.5) | Locked | 2026-04-24 | RAJI-CONTEXT |
| D-09 | Backend proxy mandatory — no Anthropic key on client | Locked | 2026-04-24 | expert-knowledge/05 |
| D-10 | India-first DPDP compliance from Day 1 | Locked | 2026-04-24 | expert-knowledge/06 |
| D-11 | Latency targets P50 < 1.8s, P95 < 2.8s | Locked | 2026-04-24 | expert-knowledge/04 |
| D-12 | Cost target ~$0.03/user/day | Locked | 2026-04-24 | expert-knowledge/07 |
| D-13 | Speaker biometrics via SpeechBrain ECAPA-TDNN | Locked | 2026-04-24 | T2 refinement |
| D-14 | IoT via ecosystem integrations (Google Home primary + SmartThings + HA advanced + Tuya + BroadLink) | Locked | 2026-04-24 | T5 |
| D-15 | DB: SQLite+SQLCipher on-device; Supabase Postgres + pgvector backend | Locked | 2026-04-24 | PM |
| D-16 | Claude as Project Manager role | Locked | 2026-04-24 | User |
| D-17 | Framework stack: KMP + Compose MP; Win=C#/FlaUI; Linux=Rust/zbus | Locked | 2026-04-24 | T1 + T4 |
| D-18 | Monorepo with one-directional module graph | Locked | 2026-04-24 | T1 |
| D-19 | Dual build via manifestPlaceholders: .lite vs .pro app IDs | Locked | 2026-04-24 | T1 + T4 |
| D-20 | Voice pipeline state machine in `:shared` | Locked | 2026-04-24 | T1 + T2 |
| D-21 | Single Claude `device_control` tool; deterministic backend routing | Locked | 2026-04-24 | T5 |
| D-22 | Optimistic execution + lazy confirmation for under-2s P50; biometric gate for destructive/financial | Locked | 2026-04-24 | T5 + T4 |
| D-23 | 100-feature roadmap locked; MVP = 18 features only | Locked | 2026-04-24 | PM |
| D-24 | Modern UI/UX: Material 3 Expressive + dark default + dynamic color + 60fps springs | Locked | 2026-04-24 | PM |
| D-25 | Performance budget: APK ≤22MB, cold start <500ms, battery <5%/hr, RAM <180MB active | Locked | 2026-04-24 | PM |

## Process for new decisions

1. Propose via pull request updating this file AND `raji-research/RAJI-CONTEXT.md`.
2. Number sequentially (D-26 next).
3. Include: what, why, alternatives considered, who decides.
4. Mark status: Proposed → Accepted → Locked, or Deprecated / Superseded.
5. Never silently reverse a Locked decision.
