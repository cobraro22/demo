import { test as setup, expect } from "@playwright/test";

const authfile = ".auth/authorization.json";

setup("authorization", async ({ page }) => {
  await page.goto("/");

  // dupa testID
  // await page.getByTestId("username").fill("standard_user");
  // await page.getByTestId("password").fill("secret_sauce");
  // await page.getByTestId("login-button").click();

  // dupa id #
  // await page.locator("#user-name").fill("standard_user");
  // await page.locator("#password").fill("secret_sauce");
  // await page.locator("#login-button").click();

  // dupa tag input si un atribut name
  // await page.locator("input[name='user-name']").fill("standard_user");
  // await page.locator("input[name='password']").fill("secret_sauce");
  // await page.locator("input[name='login-button']").click();

  // dupa placeholder
  // await page.getByPlaceholder("username").fill("standard_user");
  // await page.getByPlaceholder("password").fill("secret_sauce");
  // // class locator
  // await page.locator(".submit-button").click();

  // by role

  await page.getByRole("textbox", { name: "username" }).fill("standard_user");
  await page.getByRole("textbox", { name: "password" }).fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveTitle("Swag Labs");

  await page.waitForURL("/inventory.html");

  // await page.getByAltText('')

  await page.context().storageState({ path: authfile });
});
