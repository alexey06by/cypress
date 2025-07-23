import { defineConfig } from "cypress";
import * as dotenv from "dotenv"
dotenv.config()

module.exports = defineConfig({
  e2e: {
    env: {
      BASE_URL:process.env.CYPRESS_BASE_URL,
      INVALID_LOGIN:process.env.CYPRESS_INVALID_LOGIN,
      INVALID_PASSWORD:process.env.CYPRESS_INVALID_PASSWORD,
    },
    video: true,
    screenshotsFolder: 'cypress/screenshots',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
