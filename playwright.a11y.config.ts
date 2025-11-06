import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/a11y",
  use: {
    trace: "retain-on-failure",
    ...devices["Desktop Chrome"],
  },
  reporter: [["html", { outputFolder: ".reports/playwright-a11y" }]],
});
