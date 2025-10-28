import { test, Browser, Page, expect } from '@playwright/test';


test.describe('Navegación en www.freerangetesters.com', () => {
  //Un poco mas actualizado
  const secciones = [
    { nombre: 'Academia', url: '/academia', tituloEsperado: 'Academia' },
    { nombre: 'Cursos', url: '/cursos', tituloEsperado: 'Cursos' },
    { nombre: 'Recursos', url: '/recursos', tituloEsperado: 'Recursos' },
  ];


  for (const seccion of secciones) {
    
    test(`Validar redirección a la sección "${seccion.nombre}"`, async ({ page }) => {
      await test.step(`Estando yo en la web principal www.freerangetesters.com`, async () => {
        await page.goto('https://www.freerangetesters.com', { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/Free Range Testers/i);
      });

      await test.step(`Cuando hago click en "${seccion.nombre}"`, async () => {
        await page.locator('#page_header').getByRole('link', { name: seccion.nombre, exact: true }).click();
        await page.waitForURL(`**${seccion.url}`);
      });

      await test.step(`Soy redirigido a la sección de título "${seccion.tituloEsperado}"`, async () => {
        await expect(page).toHaveTitle(seccion.tituloEsperado);


      });
    });
  }

})


