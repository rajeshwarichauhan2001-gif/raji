# Security Policy

## Supported Versions

Raji is in active pre-release development. Security fixes will be applied to:

- Current main branch (always)
- Latest released version (when releases begin in Phase 1)

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, email: **security@techinfinity.io** with:

- Type of issue (e.g., auth bypass, secret exposure, injection)
- Full paths of source file(s) related to the issue
- Location of the affected source code (tag/branch/commit or URL)
- Step-by-step reproduction
- Impact assessment — what an attacker could achieve
- Any proof-of-concept code

## Response Commitments

| Severity | Initial response | Fix target |
|----------|------------------|------------|
| Critical | 24 hours | 7 days |
| High | 48 hours | 14 days |
| Medium | 5 business days | 30 days |
| Low | 10 business days | 90 days |

We will keep you informed throughout the process and credit you publicly once the fix ships (unless you prefer to stay anonymous).

## Scope

In scope:
- Raji Android app (Lite and Pro builds)
- Raji desktop companions (Windows, Linux)
- Backend API (Supabase Edge Functions, database)
- CI/CD configuration
- Auth flows

Out of scope:
- Findings requiring physical device access
- Social engineering attacks
- Denial of service via volumetric attacks
- Issues in third-party dependencies already published with CVEs (report upstream)

## Disclosure

We follow coordinated disclosure. We ask that you give us a reasonable time window (see table above) to fix and roll out the patch before publishing details.

## Bug Bounty

A formal bug bounty program will launch after Phase 1 public release. Until then, we acknowledge valid reporters in release notes and provide a thank-you reward on a case-by-case basis.

## Security Practices

See [`docs/architecture/SECURITY-MODEL.md`](docs/architecture/SECURITY-MODEL.md) for our threat model and mitigations.
