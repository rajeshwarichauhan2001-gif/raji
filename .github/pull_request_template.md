<!--
  Raji PR template — required sections enforced by pr-checks.yml.
  Keep the two H2 headings (## Summary and ## Test plan) intact.
-->

## Summary

<!-- 1-3 bullets describing WHAT changed and WHY. Link related issues with `Fixes #123`. -->

-
-

## Test plan

<!-- Checklist of how you verified this change. Tick items you ran. -->

- [ ] Unit tests added/updated and passing locally
- [ ] Manual smoke test on affected platform (Android Lite / Android Pro / Desktop / Backend)
- [ ] No regression in APK size (CI gate enforces <500KB delta)
- [ ] No new permissions or Accessibility scopes added without D-06 policy review
- [ ] Screenshots / recordings attached for UI changes

## Risk

<!-- One-liner: low / medium / high + why.  "low: backend-only, staging deploy gated" etc. -->

## Rollback plan

<!-- How do we revert if this breaks in prod?  "Revert commit" is fine for most changes; call
     out anything needing migration rollback, config flip, or Play Store halted rollout. -->

---

### Required before requesting review

- [ ] PR title follows Conventional Commits (e.g. `feat:`, `fix:`, `chore:`)
- [ ] At least one label applied (`area:*` and `type:*`)
- [ ] CI is green (or failures explained)
- [ ] Relevant docs / runbooks updated
