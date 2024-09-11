import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // baseUrl: 'http://localhost:5173',
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
    defaultCommandTimeout: 10000,
    screenshotOnRunFailure: true,
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
