# Launch Checklist — Phase 1 (Play Store + Sideload Pro)

Complete before public release. Each item either blocks launch or must be waived with documented rationale.

---

## Legal / compliance

- [ ] Privacy policy published at `raji.app/privacy` in English + Hindi
- [ ] Terms of service published at `raji.app/terms`
- [ ] DPDP Act consent flows implemented per `expert-knowledge/06-india-compliance.md`
- [ ] Privacy counsel review signed off
- [ ] Data retention schedule matches policy
- [ ] Breach response playbook + templates prepared
- [ ] Accessibility disclosure screen text approved verbatim (do not change post-review)
- [ ] Minors: age gate at signup; under-18 flow drafted
- [ ] Contributor license arrangement if using any GPL dependencies

## Play Store (Lite)

- [ ] Play Console app created
- [ ] App bundle signed with Play App Signing
- [ ] Data Safety form matches actual collection
- [ ] Permission Declaration forms submitted (SMS, Call, Accessibility if declared)
- [ ] Screenshots (phone + tablet) prepared
- [ ] Short + full description in English + Hindi
- [ ] Feature graphic
- [ ] Video walkthrough (30-60 sec, showing accessibility use case)
- [ ] Testing track populated with 20+ internal testers
- [ ] Closed beta track with 100+ opted-in users for 2 weeks
- [ ] All reviewer policy concerns addressed

## Sideload (Pro)

- [ ] APK signed with Pro keystore
- [ ] Hosted at `raji.app/pro-download`
- [ ] SHA256 hash published alongside download
- [ ] Installation guide (with screenshots) published
- [ ] Google Play Protect whitelist process documented for users
- [ ] Auto-update mechanism: Remote Config for selectors; in-app prompt for APK updates

## Technical readiness

- [ ] APK size within budget (Lite ≤22MB, Pro ≤28MB) — per D-25
- [ ] Cold start P50 < 500ms on mid-tier device
- [ ] Voice-to-voice latency P50 < 1.8s, P95 < 2.8s — per D-11
- [ ] Battery drain < 5%/hr always-on (measured, not estimated)
- [ ] Crash-free sessions > 99.5% in closed beta
- [ ] OEM compatibility verified on: Pixel, Xiaomi/Redmi, OPPO/Realme, Vivo, Samsung
- [ ] All 18 MVP features from `FEATURES-100.md` pass acceptance tests
- [ ] Observability live: Sentry, Grafana, PostHog

## Security

- [ ] All items in `SECURITY-MODEL.md` pre-launch checklist complete
- [ ] Third-party penetration test complete; high/critical findings fixed
- [ ] Bug bounty program public (or scheduled within 30 days of launch)

## Operations

- [ ] Status page at `status.raji.app`
- [ ] Support email `help@techinfinity.io` with auto-reply
- [ ] Incident on-call rotation established
- [ ] Budget alerts configured on Anthropic dashboard (50%, 80%, 100%)
- [ ] Cost dashboard shows per-user-per-day metric
- [ ] Rollback plan documented for: bad release, Claude outage, Supabase incident

## Marketing (can overlap launch)

- [ ] Landing page at `raji.app`
- [ ] Demo video (90-second)
- [ ] Feature highlight GIFs
- [ ] Press kit (logo, screenshots, bio)
- [ ] Social media accounts created
- [ ] Analytics on marketing site

---

## Waiver process

If an item cannot be completed before launch, document in an appendix:
- What is being waived
- Risk assessment
- Compensating control or plan
- Target date to complete
- Approver

Waiving security / legal items requires founder + counsel sign-off. No waivers on DPDP, Play Store policy, or cost/battery/latency kill thresholds.
