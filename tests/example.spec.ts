import { test, expect } from "@playwright/test";

test("has sign title and lead message", async ({ page }) => {
  await page.goto("http://localhost:3000/sign-in");

  const signInTitle = page.getByTestId("sign-in-title");
  await expect(signInTitle).toHaveText("Welcome!");
  const signInMessage = page.getByTestId("sign-in-message");
  await expect(signInMessage).toHaveText("Log in to access your account");
});

test("has sign up link", async ({ page }) => {
  await page.goto("http://localhost:3000/sign-in");
  const signUp = page.locator("[data-localization-key='signIn.start.actionLink']");
  await expect(signUp).toHaveText("Sign up");
});

test("should navigate to sign up page", async ({ page }) => {
  await page.goto("http://localhost:3000/sign-in");
  const signUp = page.locator("[data-localization-key='signIn.start.actionLink']");
  await signUp.click();
  console.log(page.url());
  await page.waitForURL("http://localhost:3000/sign-up?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Fdashboard");

  expect(page.url()).toBe("http://localhost:3000/sign-up");
});
