import { test, expect } from '@playwright/test';

test("Hace un mock de una fruta que no viene de la API real ", async ({ page }) => {
    // Hacemos un mock de la API antes de navegar
    await page.route('*/**/api/v1/fruits', async route => {
        const json = [{ name: 'Maracuya', id: 26 }];
        await route.fulfill({ json });
    });
    // Vamos a la página
    await page.goto('https://demo.playwright.dev/api-mocking');

    // Validamos que Melocotón está disponible
    await expect(page.getByText('Maracuya')).toBeVisible();
});

test('Obtengo la respuesta real y le agrego algo no tan real', async ({ page }) => {
    // Obtenemos la respuesta y le agregamos un extra
    await page.route('*/**/api/v1/fruits', async route => {
        const response = await route.fetch();
        const json = await response.json();
        json.push({ name: 'Lulito', id: 200 });
        // Obtenemos la respuesta real mientras que le agregamos un extra
        // al objeto JSON que va a estar siendo representado.
        await route.fulfill({ response, json });
    });

    // Vamos a la página
    await page.goto('https://demo.playwright.dev/api-mocking');

    // Validamos que vino la respuesta real con el extra que le sumamos antes
    await expect(page.getByText('Lulito', { exact: true })).toBeVisible();
});

