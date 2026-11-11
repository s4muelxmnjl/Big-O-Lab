import { test, expect } from "@playwright/test";
import { challenges } from "../src/domain/challenges";
async function solveLevel(
  page: import("@playwright/test").Page,
  level: number,
) {
  const qs = challenges.filter((q) => q.level === level);
  for (let i = 0; i < qs.length; i++) {
    if (i < qs.length - 1) {
      await expect(
        page.getByRole("button", { name: `Desafío ${i + 2}`, exact: true }),
      ).toBeDisabled();
    }
    await page.locator(".answer").nth(qs[i].answer).click();
    await expect(
      page.getByRole("progressbar", { name: "Retos resueltos del nivel" }),
    ).toHaveAttribute("value", String(i + 1));
    const recap = page.getByRole("region", {
      name: "Explicación del punto resuelto",
    });
    await expect(
      recap.getByRole("heading", { name: qs[i].learning.concept }),
    ).toBeVisible();
    await expect(recap.getByRole("listitem")).toHaveCount(3);
    await expect(
      recap.getByText(qs[i].learning.takeaway, { exact: true }),
    ).toBeVisible();
    if (i < qs.length - 1) {
      await expect(
        page.getByRole("button", { name: `Desafío ${i + 2}`, exact: true }),
      ).toBeEnabled();
      await page
        .getByRole("button", { name: "Siguiente desafío", exact: true })
        .click();
    }
  }
}
test("recorrido completo, persistencia y XP idempotente", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "La idea detrás de O(n²)" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: /NIVEL 02/ })).toBeDisabled();
  await page.getByRole("button", { name: /A 8 comparaciones/ }).click();
  await expect(page.getByText("Todavía no. Probemos otra vez.")).toBeVisible();
  await expect(page.getByText("0 XP", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Explicación del punto resuelto" }),
  ).toHaveCount(0);
  await solveLevel(page, 1);
  await expect(page.getByText("100 XP", { exact: true })).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Contar todos con todos" }),
  ).toBeVisible();
  await solveLevel(page, 1);
  await expect(page.getByText("100 XP", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Siguiente nivel" }).click();
  const counter = page.getByTestId("counter");
  await expect(counter).toHaveText("0 / 25");
  await page.getByRole("button", { name: "Siguiente paso" }).click();
  await expect(counter).toHaveText("1 / 25");
  await page.getByRole("button", { name: "Iniciar", exact: true }).click();
  await page.getByRole("button", { name: "Pausar", exact: true }).click();
  const paused = await counter.textContent();
  await page.waitForTimeout(400);
  await expect(counter).toHaveText(paused!);
  await page.getByRole("button", { name: "Reiniciar simulación" }).click();
  await page.locator("#size").fill("1");
  await page.getByRole("button", { name: "Iniciar", exact: true }).click();
  await expect(counter).toHaveText("1 / 1");
  await expect(
    page.getByRole("button", { name: "Iniciar", exact: true }),
  ).toBeDisabled();
  await page.locator("#size").fill("20");
  await expect(counter).toHaveText("0 / 400");
  await expect(page.locator(".cell")).toHaveCount(400);
  await page.getByRole("button", { name: "Iniciar", exact: true }).click();
  await page.getByRole("button", { name: "Reiniciar simulación" }).click();
  await page.waitForTimeout(400);
  await expect(counter).toHaveText("0 / 400");
  await solveLevel(page, 2);
  await page.getByRole("button", { name: "Siguiente nivel" }).click();
  await solveLevel(page, 3);
  await page.getByRole("button", { name: "Siguiente nivel" }).click();
  await solveLevel(page, 4);
  await page.getByRole("button", { name: "Siguiente nivel" }).click();
  await page.locator("#comparison").selectOption("100");
  await expect(page.getByText("4950", { exact: true })).toBeVisible();
  await solveLevel(page, 5);
  await expect(
    page.getByRole("heading", { name: "Ya piensas en grande." }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Ver mi victoria" }).click();
  await expect(
    page.getByRole("heading", { name: "Ya piensas en grande." }),
  ).toBeVisible();
  await expect(page.getByText("1800 XP", { exact: true })).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Ya piensas en grande." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Volver a explorar" }).click();
  await solveLevel(page, 1);
  await expect(page.getByText("1800 XP", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Reiniciar mi progreso" }).click();
  await page.getByRole("button", { name: "Conservar progreso" }).click();
  await expect(page.getByText("1800 XP", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Reiniciar mi progreso" }).click();
  await page.getByRole("button", { name: "Borrar progreso" }).click();
  await expect(page.getByText("0 XP", { exact: true })).toBeVisible();
});
test("móvil, teclado, movimiento reducido y datos corruptos", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() =>
    localStorage.setItem("big-o-lab.progress.v1", "broken"),
  );
  await page.reload();
  await expect(page.getByText("0 XP", { exact: true })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: /B 16 comparaciones/ }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText("100 XP", { exact: true })).toBeVisible();
  await page.screenshot({ path: "/tmp/big-o-lab-mobile.png", fullPage: true });
  await page.getByRole("button", { name: "Siguiente nivel" }).click();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
test("desktop sin errores de ejecución", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.screenshot({ path: "/tmp/big-o-lab-desktop.png", fullPage: true });
  expect(errors).toEqual([]);
});
