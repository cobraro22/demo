import { test, expect } from "@playwright/test";

test("test example", async ({ page }) => {
  await page.goto("/");

  //   await expect(page).toHaveURL("saucedemo.com");

  await expect(page).toHaveTitle("Swag Labs");

  const wrapperLogin = page.locator(".login_wrapper-inner");

  const loginWrapper = page.locator(".login_credentials_wrap-inner");

  await expect(wrapperLogin).toHaveScreenshot();

  // await expect(loginWrapper).toHaveScreenshot({ maxDiffPixels: 2000 });

  // await expect(page).toHaveScreenshot({ maxDiffPixels: 200 });
});

test("testAUI ", { tag: ["@testtag2", "@regression"] }, async ({ page }) => {
  await page.goto(process.env.EMAG);

  // page.locator('data-test="main-price"')

  let pretMain = await page.locator('[data-test="main-price"]').textContent();

  console.log("Bicicleta are pretul: " + pretMain);

  // console.log(process.env.EMAG2);

  await page.goto(process.env.EMAG2);

  // page.locator('data-test="main-price"')

  pretMain = await page.locator('[data-test="main-price"]').textContent();

  console.log("Ceainicul are pretul: " + pretMain);

  await page.goto(process.env.Euribor);

  const euribor = await page
    .locator("tr", { hasText: "Euribor 3 months" })
    .locator(".text-right")
    .textContent();

  // page.getByRole('row',{name:"Euribor 3 "}).locator(".text-right")

  console.log(`Euribor 3 months rate:->${euribor}`);
  // await page.goto("https://undressai.tools");
});
