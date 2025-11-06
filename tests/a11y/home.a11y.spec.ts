import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("home has no critical a11y issues", async ({ page }: { page: any }) => {
  await page.goto("/");
  const a11yScanResults = await new AxeBuilder({ page }).analyze();
  const critical = a11yScanResults.violations.filter(
    (violation: any) =>
      violation.impact === "critical" || violation.impact === "serious",
  );

  expect(critical).toEqual([]);
});
