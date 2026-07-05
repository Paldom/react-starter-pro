## Summary

<!-- What does this change and why? One or two sentences. Link related issues with "Closes #". -->

## Checklist

- [ ] `npm run typecheck`, `npm run lint`, and `npm run test` pass locally
- [ ] `npm run format` (Prettier) has been run
- [ ] If `openapi/openapi.yaml` changed, generated code was regenerated via `npm run api:gen` (generated code is never hand-edited)
- [ ] New i18n keys added to BOTH `public/locales/en/common.json` and `public/locales/hu/common.json`
- [ ] Coverage thresholds still met (`npm run test:coverage`)
- [ ] Docs (README.md / AGENTS.md) updated if behavior changed
