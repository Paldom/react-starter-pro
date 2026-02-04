# React Starter Pro — Assistant Chat UI Starter

A production-ready React starter that ships with a complete assistant/chat UI sample, demonstrating scalable frontend patterns and tooling.

## Features

- Assistant UI thread with streaming responses (mock LangGraph runtime by default)
- Command palette search (`Cmd/Ctrl+K`) and settings (`Cmd/Ctrl+,`)
- Document upload sidebar with drag-and-drop
- Type-safe API client generation (OpenAPI + Orval)
- Server state with TanStack Query, client state with Zustand
- Internationalization with react-i18next and locale-aware formatting
- Tailwind CSS v4 with shadcn/ui components
- Storybook with shadcn/ui story registry
- MSW for API mocking in development and tests
- 80% test coverage with Vitest + mutation testing
- TypeScript strict mode with ESLint flat config
- Enforced import boundaries for `src/shared` via ESLint
- Vendor chunk splitting in Vite build
- Automated CI with GitHub Actions

## Project Structure

```
.storybook/                       # Storybook configuration
├── main.ts                       # Storybook main config
└── preview.ts                    # Global decorators and styles

src/
├── app/                          # App shell + providers + router + init hooks
│   ├── providers/                # Query client + Suspense boundary
│   ├── router/                   # Route definitions
│   ├── hooks/                    # App-level effects (theme, language)
│   └── App.tsx                   # Root application component
│
├── components/                   # App-level UI
│   ├── assistant-thread.tsx       # Assistant UI thread + composer
│   ├── chat-shell.tsx             # Main layout shell
│   ├── chat-search-dialog.tsx     # Command palette search
│   ├── settings-dialog.tsx        # Settings modal
│   ├── document-sidebar.tsx       # Document upload panel
│   ├── app-header.tsx
│   ├── app-sidebar.tsx
│   └── ui/                        # shadcn/ui primitives
│
├── hooks/                        # shadcn-provided hooks (e.g. use-mobile)
├── lib/                          # Local utilities + mock runtime
│   ├── langgraph-runtime.ts       # Mock streaming runtime
│   ├── chat-data.ts               # Sample project/chat data
│   └── utils.ts
│
├── shared/                       # Cross-cutting reusable code
│   ├── api/                      # Axios client + Orval-generated hooks
│   └── store/                    # Zustand UI state
│
├── i18n/                         # i18n config + client helpers
├── i18n.ts                       # i18next initialization
├── i18next.d.ts                  # TypeScript type definitions
│
├── mocks/                        # MSW mock handlers
├── test/                         # Global test utilities
├── index.css                     # Tailwind + shadcn CSS variables
├── main.tsx                      # App entry
└── vite-env.d.ts

public/
└── locales/                      # Translation files
    ├── en/                       # English translations
    │   └── common.json
    └── hu/                       # Hungarian translations
        └── common.json

components.json                   # shadcn/ui configuration
openapi/openapi.yaml              # OpenAPI spec
orval.config.ts                   # Orval client generation
.storybook/                       # Storybook config
```

**Layering Rules:** `src/shared` must not import from `src/app`, `src/components` (including `components/ui`), `src/mocks`, or `src/test`. Higher layers may import from `src/shared`. Tests and stories under `src/shared` are exempt.

## Getting Started

**Prerequisites:** Node.js 24+ recommended (CI uses 24). Vite 7 requires Node 20.19+ or 22.12+.

```bash
# Install dependencies
npm install
# or
npm ci

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Scripts

```bash
# Development
npm run dev
npm run build
npm run preview

# Testing
npm test
npm run test:ui
npm run test:coverage
npm run test:mutation

# Quality
npm run typecheck
npm run lint
npm run lint:fix
npm run format

# API generation
npm run api:gen

# Storybook
npm run storybook
npm run build-storybook

# Sonar (requires mise + sonar-scanner)
npm run sonar:version
npm run sonar:scan
```

## Testing

```bash
# Run tests
npm test

# Run with coverage (80% statements/branches/functions/lines enforced)
npm run test:coverage

# Run with UI
npm run test:ui

# Mutation testing (Stryker)
npm run test:mutation
```

Storybook tests can run via the Vitest addon by setting `VITEST_BROWSER=true`.

## Storybook

```bash
# Run Storybook (http://localhost:6006)
npm run storybook

# Build static Storybook
npm run build-storybook

# Add shadcn/ui components with stories from the registry
npx shadcn@latest add @storybook/button-story
npx shadcn@latest add @storybook/card-story
npx shadcn@latest add @storybook/dialog-story
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENABLE_MOCKS=true

# LangGraph configuration (optional - mock mode used when not set)
VITE_LANGGRAPH_API_URL=
VITE_LANGGRAPH_ASSISTANT_ID=
```

If the LangGraph variables are not set, the app uses the mock streaming runtime.

## Code Quality Standards

- 80% test coverage enforced (statements/branches/functions/lines)
- Stryker mutation thresholds: high 80, low 60, break 50
- TypeScript strict mode
- Zero linting errors
- WCAG compliant components

## CI

GitHub Actions runs on Node 24 and executes `typecheck`, `lint`, `test:coverage`, `build`, then `test:mutation`.

## Contributing

1. Follow the existing code structure
2. Maintain 80% test coverage
3. Ensure all tests pass including mutation tests
4. Run `npm run lint:fix` and `npm run format` before committing
5. Write meaningful commit messages
6. Ensure no accessibility issues

## Tech Stack

- **React 19.2.4** - UI library
- **TypeScript 5.9.3** - Type safety
- **Vite 7.3.1** - Build tool
- **@assistant-ui/react 0.12.3** - Assistant UI primitives
- **@assistant-ui/react-langgraph 0.12.2** - LangGraph runtime adapter
- **@langchain/langgraph-sdk 1.5.5** - LangGraph SDK
- **TanStack Query 5.90.20** - Server state
- **Zustand 5.0.11** - Client state
- **React Router 7.13.0** - Routing
- **Tailwind CSS 4.1.18** - Styling
- **i18next 25.8.1** - Internationalization
- **react-i18next 16.5.4** - React i18n integration
- **React Hook Form 7.71.1** - Forms
- **Zod 4.3.6** - Schema validation
- **Orval 8.2.0** - OpenAPI code generation
- **Axios 1.13.4** - HTTP client
- **Vitest 4.0.18** - Testing framework
- **MSW 2.12.7** - API mocking
- **Stryker 9.5.1** - Mutation testing
- **Storybook 10.2.4** - Component documentation

## License

MIT
