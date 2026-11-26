import {defineConfig} from 'vitest/config';
export default defineConfig({
 test:{include:['tests/*.test.ts'],exclude:['tests/integration/**'],environment:'node',testTimeout:10000,
 coverage:{provider:'v8',reporter:['text','json-summary','lcov'],reportsDirectory:'../../coverage/api-unit',
  include:['src/modules/billing/billing.rules.ts','src/modules/billing/cashfree.signature.ts',
   'src/modules/learning/learning.logic.ts','src/infrastructure/security/session-policy.ts',
   'src/infrastructure/resilience/*.ts'],
  thresholds:{lines:75,statements:75,functions:75,branches:65}}}
});
