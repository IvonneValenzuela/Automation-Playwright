import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    
    /*   
      - Api Tests are not expected to be run against any device
      - Navegacion2.spec.ts is expected to only be run in Chrome to avoid parallel runs
    */
    // 🌐 Desktop
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: [
        'tests/[Aa]pi/**',
      ],
    },
    
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: [
        'tests/[Aa]pi/**',
        'tests/Navegacion2.spec.ts',
      ],
    },

    // 🔗 API (API specs only)
    {
      name: 'APITestonMain',
      testMatch: [
        'tests/Api/APITestOnMain.spec.ts',
        'tests/Api/E2EAPI.spec.ts'
      ],
      use: {  
        baseURL:'https://api.github.com',
        extraHTTPHeaders: {
	        'Accept': 'application/vnd.github.v3+json',
	        'Authorization': `token ${process.env.API_MAIN_TOKEN}`,
        }
      },
      workers: 1,
    },

    {
      name: 'APITest',
      testMatch: [
        'tests/Api/APITest.spec.ts',
        'tests/Api/APIMock.spec.ts'
      ],
      use: {  
        baseURL:'https://api.github.com',
        extraHTTPHeaders: {
	        'Accept': 'application/vnd.github.v3+json',
	        'Authorization': `token ${process.env.API_TEST_TOKEN}`,
        }
      },
      workers: 1,
    },

    //{
      //name: 'webkit',
      //use: { ...devices['Desktop Safari'] },
   // },

    //📱 Test against mobile viewports.
    {
      name: 'iPhone 13',
      use: { ...devices['iPhone 13'] },
      testIgnore: [
        'tests/[Aa]pi/**',
        'tests/Navegacion2.spec.ts'
      ],
    }, 

    {
      name: 'iPad',
      use: { ...devices['iPad (gen 7)'] },
      testIgnore: [
        'tests/[Aa]pi/**',
        'tests/Navegacion2.spec.ts'
      ],
    }, 


    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

});
