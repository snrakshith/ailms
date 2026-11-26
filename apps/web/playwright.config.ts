import {defineConfig,devices} from '@playwright/test';

const ci=Boolean(process.env.CI);
export default defineConfig({
  testDir:'./e2e',
  testMatch:'**/*.spec.ts',
  fullyParallel:true,
  forbidOnly:ci,
  retries:ci?2:0,
  workers:ci?2:undefined,
  timeout:45_000,
  expect:{timeout:12_000},
  reporter:ci?[['list'],['html',{open:'never',outputFolder:'playwright-report'}],['junit',{outputFile:'test-results/junit.xml'}]]:[['list'],['html',{open:'never'}]],
  outputDir:'test-results',
  use:{baseURL:process.env.PLAYWRIGHT_BASE_URL||'http://127.0.0.1:5173',trace:'on-first-retry',screenshot:'only-on-failure',video:'retain-on-failure'},
  projects:[
    {name:'chromium',use:{...devices['Desktop Chrome']}},
    {name:'firefox',use:{...devices['Desktop Firefox']}},
    {name:'webkit',use:{...devices['Desktop Safari']}},
  ],
  webServer:process.env.PLAYWRIGHT_EXTERNAL_SERVER==='1'?undefined:[
    {command:'pnpm --filter @sapling/api dev',url:'http://127.0.0.1:4000/health/ready',timeout:120_000,reuseExistingServer:!ci},
    {command:'pnpm --filter @sapling/web dev',url:'http://127.0.0.1:5173/login',timeout:120_000,reuseExistingServer:!ci},
  ],
});
