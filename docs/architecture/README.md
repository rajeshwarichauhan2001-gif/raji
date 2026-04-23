# Raji Architecture Documentation

This folder contains the architecture reference for project Raji.

## Index

| Document | Purpose |
|----------|---------|
| [OVERVIEW.md](OVERVIEW.md) | High-level system architecture and module map |
| [DECISIONS.md](DECISIONS.md) | ADR (Architecture Decision Records) index — D-01 through D-25 |
| [DATA-MODEL.md](DATA-MODEL.md) | Backend tables + on-device SQLite schema |
| [SECURITY-MODEL.md](SECURITY-MODEL.md) | Threat model and mitigations |

## Source material

These docs are consolidations of deeper research that lives in the sibling `raji-research/` folder (outside this repo — shared development workspace). Key source files:

- `raji-research/RAJI-CONTEXT.md` — single source of truth for decisions
- `raji-research/MASTER-ARCHITECTURE.md` — full research consolidation
- `raji-research/expert-knowledge/` — 12 production-wisdom documents
- `raji-research/terminal-1-frameworks/` through `terminal-5-iot/` — 5 research streams

If you are a new contributor, start with OVERVIEW.md → DECISIONS.md.
