import { test, expect } from "@playwright/test";
import { diagramFor, markedCount } from "../src/domain/diagrams";
import { guideFor, isStarterChallenge } from "../src/domain/guides";
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
    const help = page.getByRole("button", { name: "Cómo resolver este reto" });
    await expect(help).toHaveAttribute(
      "aria-expanded",
      String(isStarterChallenge(qs[i].id)),
    );
    if (!isStarterChallenge(qs[i].id)) await help.click();
    const guide = page.getByRole("region", {
      name: "Guía para resolver el reto",
    });
    await expect(guide.getByRole("listitem")).toHaveCount(3);
    await expect(
      guide.getByText(guideFor(qs[i].id).example, { exact: true }),
    ).toBeVisible();
    const visual = guide.getByRole("region", {
      name: "Ilustración del ejemplo",
    });
    const panels = diagramFor(qs[i].id).panels;
    await expect(visual.getByRole("img")).toHaveCount(panels.length);
    for (let panelIndex = 0; panelIndex < panels.length; panelIndex++) {
      const image = visual.getByRole("img").nth(panelIndex);
      await expect(image).toBeVisible();
      await expect(image.locator('rect[data-marked="true"]')).toHaveCount(
        markedCount(panels[panelIndex]),
      );
    }
    if (qs[i].id === "intro") {
      for (const row of ["Ana", "Leo", "Sol", "Max"])
        for (const col of ["Ana", "Leo", "Sol", "Max"])
          await page
            .getByRole("button", {
              name: `Comparar ${row} con ${col}`,
              exact: true,
            })
            .click();
      await page.getByRole("button", { name: "Comprobar recorrido" }).click();
    } else if (
      /^\d+$/.test(qs[i].options[qs[i].answer]) &&
      !isStarterChallenge(qs[i].id)
    ) {
      await page
        .getByLabel("Calcula tu respuesta")
        .fill(qs[i].options[qs[i].answer]);
      await page.getByRole("button", { name: "Comprobar cálculo" }).click();
    } else await page.locator(".answer").nth(qs[i].answer).click();
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
  await expect(
    page.getByRole("button", { name: "Comprobar recorrido" }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Comparar Ana con Ana", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Comparar Ana con Ana", exact: true })
    .click();
  await expect(page.getByText("1 de 16 encuentros")).toBeVisible();
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
  await expect(page.getByLabel("Velocidad de exploración")).toHaveValue("500");
  const counter = page.getByTestId("counter");
  await expect(counter).toHaveText("0 / 9");
  await page.getByRole("button", { name: "Siguiente paso" }).click();
  await expect(counter).toHaveText("1 / 9");
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
  await page.getByLabel("Velocidad de exploración").selectOption("60");
  await page
    .getByRole("slider", { name: "Explorar paso de simulación" })
    .fill("12");
  await expect(counter).toHaveText("12 / 400");
  await page.getByRole("button", { name: "Siguiente paso" }).click();
  await expect(counter).toHaveText("13 / 400");
  await solveLevel(page, 2);
  await page.getByRole("button", { name: "Siguiente nivel" }).click();
  await expect(page.locator(".answer")).toHaveCount(3);
  await expect(page.getByLabel("Calcula tu respuesta")).toHaveCount(0);
  await page.locator(".answer").nth(0).click();
  await expect(page.getByText("Todavía no. Probemos otra vez.")).toBeVisible();
  await expect(page.getByText("200 XP", { exact: true })).toBeVisible();
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
  await expect(page.getByText("1900 XP", { exact: true })).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Ya piensas en grande." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Volver a explorar" }).click();
  await solveLevel(page, 1);
  await expect(page.getByText("1900 XP", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Reiniciar mi progreso" }).click();
  await page.getByRole("button", { name: "Conservar progreso" }).click();
  await expect(page.getByText("1900 XP", { exact: true })).toBeVisible();
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
  await page
    .getByRole("button", { name: "Comparar Ana con Ana", exact: true })
    .focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText("1 de 16 encuentros")).toBeVisible();
  await solveLevel(page, 1);
  await expect(page.getByText("100 XP", { exact: true })).toBeVisible();
  await page
    .getByRole("region", { name: "Ilustración del ejemplo" })
    .screenshot({ path: "/tmp/big-o-grid-example.png" });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
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

test("laboratorio: datos propios, salidas tempranas, reinicio y ejecución", async ({
  page,
}) => {
  await page.addInitScript(
    (solved) =>
      localStorage.setItem(
        "big-o-lab.progress.v1",
        JSON.stringify({ version: 1, solved }),
      ),
    challenges.filter((q) => q.level < 5).map((q) => q.id),
  );
  await page.goto("/");
  await page.getByRole("button", { name: "NIVEL 05 Optimizar" }).click();
  const lab = page.getByRole("region", { name: "Laboratorio de datos reales" });
  await lab.getByRole("button", { name: "Repetido al principio" }).click();
  for (let i = 0; i < 3; i++)
    await lab.getByRole("button", { name: "Un paso en ambos" }).click();
  await expect(lab.locator(".trace-count").nth(0)).toHaveText("1 operación");
  await expect(lab.locator(".trace-count").nth(1)).toHaveText("3 operaciones");
  await expect(
    lab.getByText("Resultado: hay repetidos.", { exact: true }),
  ).toHaveCount(2);
  await lab.getByLabel("Tu arreglo").fill("1,,2");
  await lab.getByRole("button", { name: "Aplicar datos" }).click();
  await expect(lab.getByRole("alert")).toBeVisible();
  await lab.getByLabel("Tu arreglo").fill("1, 2, 3, 1");
  await lab.getByRole("button", { name: "Aplicar datos" }).click();
  await expect(lab.locator(".trace-count").nth(0)).toHaveText("0 operaciones");
  for (let i = 0; i < 7; i++)
    await lab.getByRole("button", { name: "Un paso en ambos" }).click();
  await expect(lab.locator(".trace-count").nth(0)).toHaveText("3 operaciones");
  await expect(lab.locator(".trace-count").nth(1)).toHaveText("7 operaciones");
  await expect(lab.getByText("vistos = {1, 2, 3}")).toBeVisible();
  await lab.getByRole("button", { name: "Todos distintos" }).click();
  await lab.getByRole("button", { name: "Ejecutar comparación" }).click();
  await lab
    .getByRole("button", { name: "Reiniciar comparación", exact: true })
    .click();
  await page.waitForTimeout(650);
  await expect(lab.locator(".trace-count").nth(0)).toHaveText("0 operaciones");
  await lab.getByLabel("Tu arreglo").fill("1,2");
  await lab.getByRole("button", { name: "Aplicar datos" }).click();
  await lab.getByRole("button", { name: "Ejecutar comparación" }).click();
  await expect(
    lab.getByText("Resultado: todos son distintos.", { exact: true }),
  ).toHaveCount(2);
  await expect(
    lab.getByRole("button", { name: "Ejecutar comparación" }),
  ).toBeDisabled();
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await lab.screenshot({ path: "/tmp/big-o-lab-practical.png" });
});
