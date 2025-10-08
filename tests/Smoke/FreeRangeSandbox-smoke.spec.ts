import { test, expect} from '@playwright/test';

(async () => {
    
    const texToType = 'Testing ♥';
    const urlBase = 'https://thefreerangetester.github.io/sandbox-automation-testing/';

    test.describe('Automation Freerange Sandbox', () => {

        test('Dynamic ID button reveals hidden element', async ({ page }) => {

            await test.step('Given I am on the Sandbox page', async () => {
                await page.goto(urlBase);
            })
            await test.step('When I click the dynamic ID button', async () => {
                await page.getByRole('button', { name: 'Hacé click para generar un ID' }).click();
            })  
            await test.step('Then I should see the delayed message', async () => {
                await expect(page.getByText('OMG, aparezco después de 3 segundos de haber hecho click en el botón 👻.')).toBeVisible();
            })
        })
    
        test('Text field input should work correctly', async ({ page }) => {
            await test.step('Given I am on the Sandbox page of Free Range Testers', async () => {
                await page.goto(urlBase);
            })
            await test.step('When I type text into the "Un aburrido texto" field', async () => {
                await page.getByRole('textbox', { name: 'Un aburrido texto' }).fill(texToType);
            }) 
            await test.step('Then the text should be displayed in the field', async () => {
                await expect(page.getByRole('textbox', {name: 'Un aburrido texto'})).toHaveValue(texToType);
            })    
        })
    
        test('Checkbox selection should work correctly', async ({ page }) => {
            await test.step('Given I am on the Sandbox page of Free Range Testers', async () => {
                await page.goto(urlBase);
            })
            // Tip Tipsudo: make use of interpolation. e.g"  `my text ${myConst}`
            await test.step('When I check the "Helado 🍧" checkbox', async () => {
                // TODO: move 'Helado 🍧' to a const
                await page.getByLabel('Helado 🍧').check();
            });
            await test.step('Then it should be checked', async () => {
                await expect(page.getByLabel('Helado 🍧')).toBeChecked();
            });
            await test.step('When I uncheck the "Helado 🍧" checkbox', async () => {
                await page.getByLabel('Helado 🍧').uncheck();
            });
            await test.step('Then it should not be checked', async () => {
                await expect(page.getByLabel('Helado 🍧')).not.toBeChecked();
            });
        })

        test('Radio button selection should work correctly', async ({ page }) => {
            await test.step('Given I am on the Sandbox page of Free Range Testers', async () => {
                await page.goto(urlBase);
            })
            await test.step('When I select the "Sí" radio button', async () => {
                await page.getByLabel('si').check();
            })
            await test.step('Then the "Sí" option should be selected ', async () => {
                await expect(page.getByLabel('si'), 'El radio button no se seleccionó').toBeChecked(); 
            })  
        })

        test('Dropdown selection should work correctly', async ({ page }) => {
            await test.step('Given I am on the Sandbox page of Free Range Testers', async () => {
                await page.goto(urlBase);
            })
            await test.step('When I select "Tennis" from the dropdown', async () => {
                await page.getByLabel('Dropdown').selectOption('Tennis');
            })
            await test.step('Then the dropdrown should be "Tennis"', async () => {
                await expect(page.getByLabel('Dropdown')).toHaveValue('Tennis');
            }) 
        })
        
        test('Day selection from dropdown menu should work correctly', async ({ page }) => {
            test.fail(); // heads-up: This test is meant to be failed, but 'test.fail()' will make it pass
            await test.step('Given I am on the Sandbox page of Free Range Testers', async () => {
                await page.goto(urlBase); 
            })
            await test.step('When I open the day dropdown and select "Martes"', async () => {
                await page.getByRole('button', { name: 'Día de la semana'}).click();
                // TODO: make 'Martes' a const
                await page.getByRole('link',{name: 'Martes'}).click();
            })
            await test.step('Then the selected option should be "Martes"', async () => {
                await expect(page.getByRole('button', { name: 'Día de la semana' })).toContainText("Martes"); // heads-up: Here the test will fail
            })
        })
        
        test('Popup validation should work correctly', async ({ page }) => {
            await test.step('Given I am on the Sandbox page of Free Range Testers', async () => {
                await page.goto(urlBase);
            })
            await test.step('When I click on the Popup button', async () => {
                await page.getByRole('button', { name: 'Mostrar popup' }).click();
            })
            await test.step('Then should see the popup message and be able to close it', async () => {
                await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
                await page.getByRole('button', { name: 'Cerrar' }).click();
            })
        })
    })  
      
})();


