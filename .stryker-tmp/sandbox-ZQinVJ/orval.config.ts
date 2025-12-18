// @ts-nocheck
import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: './openapi/openapi.yaml',
    output: {
      mode: 'tags-split',
      target: 'src/shared/api/generated/index.ts',
      schemas: 'src/shared/api/generated/models',
      client: 'react-query',
      mock: {
        type: 'msw',
        useExamples: true,
        delay: 100,
      },
      override: {
        mutator: {
          path: 'src/shared/api/client.ts',
          name: 'customInstance',
        },
      },
    },
  },
})