# Advanced standalone React Starter

A production-ready and standalone React application demonstrating advanced patterns and best practices for scalable frontend development.

## Features

- Feature-first architecture with domain-driven organization
- Type-safe API client generation (OpenAPI + Orval)
- Server state with TanStack Query, client state with Zustand
- Internationalization with react-i18next and locale-aware formatting
- Tailwind CSS v4 with shadcn/ui patterns
- MSW for API mocking in development and tests
- 80% test coverage with Vitest + mutation testing
- TypeScript strict mode with ESLint flat config
- Route-level code splitting and performance optimization
- Automated CI/CD with GitHub Actions

## Project Structure

```
src/
├── app/                          # Application configuration
│   ├── providers/                # Provider composition layer
│   │   ├── app-provider.tsx      # Main provider orchestration
│   │   └── query-client-provider.tsx  # Stable QueryClient instance
│   ├── router/                   # Routing configuration
│   │   └── routes.tsx            # Centralized lazy route definitions
│   ├── App.tsx                   # Root application component
│   └── App.test.tsx              # Application tests
│
├── features/                     # Feature modules (domain-driven)
│   ├── dashboard/
│   │   ├── components/           # Feature components
│   │   ├── hooks/                # Feature wrappers for Orval hooks
│   │   └── pages/                # Feature pages
│   └── settings/
│       ├── hooks/                # Feature wrappers for Orval hooks
│       └── pages/                # Settings pages
│
├── shared/                       # Shared/reusable code
│   ├── api/                      # API client & generated code
│   │   ├── client.ts             # Custom axios instance
│   │   └── generated/            # Orval generated code
│   ├── components/               # Shared UI primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── LanguageSwitcher.tsx  # Language selector
│   ├── hooks/                    # Shared custom hooks
│   │   └── useLanguageEffect.ts  # HTML lang/dir synchronization
│   ├── layout/                   # Layout components
│   │   ├── AppLayout.tsx
│   │   ├── Header.tsx
│   │   └── SideNav.tsx
│   ├── lib/                      # Utility functions
│   │   └── utils.ts
│   └── store/                    # Global state (Zustand)
│       └── ui.ts
│
├── mocks/                        # MSW mock handlers
│   ├── browser.ts                # Browser MSW worker
│   ├── server.ts                 # Node MSW server
│   └── handlers.ts               # Composes Orval-generated mocks
│
├── test/                         # Global test utilities
│   └── setup.ts                  # Test setup with i18n
│
├── i18n.ts                       # i18next configuration
└── i18next.d.ts                  # TypeScript type definitions

public/
└── locales/                      # Translation files
    ├── en/                       # English translations
    │   └── common.json
    └── hu/                       # Hungarian translations
        └── common.json
```

## Getting Started

**Prerequisites:** Node.js 20+

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Testing

```bash
# Run tests
npm test

# Run with coverage (80% enforced)
npm run test:coverage

# Run with UI
npm run test:ui

# Mutation testing
npm run test:mutation
```

## Code Quality

```bash
# Type check
npm run typecheck

# Lint
npm run lint
npm run lint:fix

# Format
npm run format

# Generate API client from OpenAPI spec
npm run api:gen
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENABLE_MOCKS=true
```

## Code Quality Standards

- 80% test coverage enforced
- Mutation testing for test effectiveness
- TypeScript strict mode
- Zero linting errors
- WCAG compliant components

## Contributing

1. Follow the existing code structure
2. Maintain 80% test coverage
3. Ensure all tests pass including mutation tests
4. Run `npm run lint:fix` and `npm run format` before committing
5. Write meaningful commit messages
6. Ensure no accessibility issues

## Tech Stack

- **React 19.1** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 7.1** - Build tool
- **TanStack Query 5.90** - Server state
- **Zustand 5.0** - Client state
- **React Router 7.9** - Routing
- **Tailwind CSS 4.1** - Styling
- **i18next 25.5** - Internationalization
- **react-i18next 16.0** - React i18n integration
- **React Hook Form 7.63** - Forms
- **Zod 4.1** - Schema validation
- **Orval 7.13** - OpenAPI code generation
- **Vitest 3.2** - Testing framework
- **MSW 2.11** - API mocking
- **Stryker 9.1** - Mutation testing

## License

MIT
