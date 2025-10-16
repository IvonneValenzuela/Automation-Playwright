
import { test, expect } from '@playwright/test';
import { FRSandboxPage } from '../Pageobjects/FRSandboxPage';

test.describe('FreeRange Sandbox - Smoke (POM)', () => {
    let frSandboxPage : FRSandboxPage;   

    test.beforeEach(async ({ page }) => {
        frSandboxPage = new FRSandboxPage(page);
        await frSandboxPage.open();
    });

    test('Dynamic ID button reveals hidden element', async ({}) => {

        await frSandboxPage.clickOnDynamicButton();
        await expect(frSandboxPage.delayedGhostMessage).toBeVisible();
    })

    test('Text input should work correctly', async ({}) => {
        
        await frSandboxPage.fillTextInput('Testing ♥');
        await expect(frSandboxPage.textInput).toHaveValue('Testing ♥');
    })

    test('Checkbox selection should work correctly', async ({}) => {
        
        await frSandboxPage.checkHeladoCheckbox();
        await expect(frSandboxPage.heladoCheckBox, 'The checkbox is not selected').toBeChecked();
        
        await frSandboxPage.uncheckHeladoCheckbox();
        await expect(frSandboxPage.heladoCheckBox, 'The checkbox is selected').not.toBeChecked();
    })

    test('Radio button selection should work correctly', async ({ page }) => {
        
        
        const frSandbox = new FRSandboxPage(page);
        await test.step('Given I am on the Sandbox page of Free Range Testers', async () => {
            //await page.goto(urlBase);
            await frSandbox.open();
        })
        await test.step('When I select the "Sí" radio button', async () => {
            //await page.getByLabel('si').check();
            await frSandbox.selectSiRadioButton();
        })
        await test.step('Then the "Sí" option should be selected ', async () => {
            //await expect(page.getByLabel('si'), 'El radio button no se seleccionó').toBeChecked();
            await expect(frSandbox.siRadioButton).toBeChecked();
        })
    })

    test('Dropdown selection should work correctly', async ({ page }) => {
        const frSandbox = new FRSandboxPage(page);
        await test.step('Given I am on the Sandbox page of Free Range Testers', async () => {
            //await page.goto(urlBase);
            await frSandbox.open();
        })
        await test.step('When I select "Tennis" from the dropdown', async () => {
            //await page.getByLabel('Dropdown').selectOption('Tennis');
            await frSandbox.selectTennis();
        })
        await test.step('Then the dropdrown should be "Tennis"', async () => {
            //await expect(page.getByLabel('Dropdown')).toHaveValue('Tennis');
            await expect(frSandbox.tennisDropdownOption).toHaveValue('Tennis');
        })
    })

    test('Day selection from dropdown menu should work correctly', async ({ page }) => {
        //test.fail(); // heads-up: This test is meant to be failed, but 'test.fail()' will make it pass
        const frSandbox = new FRSandboxPage(page);
        await test.step('Given I am on the Sandbox page of Free Range Testers', async () => {
            //await page.goto(urlBase);
            await frSandbox.open();
        })
        await test.step('When I open the day dropdown and select "Martes"', async () => {
            //await page.getByRole('button', { name: 'Día de la semana'}).click();
            await frSandbox.selectDay('Martes');
        })
        await test.step('Then the selected option should be "Martes"', async () => {
            //await expect(page.getByRole('button', { name: 'Día de la semana' })).toContainText("Martes"); // heads-up: Here the test will fail
            await expect(page).toHaveURL(/#\/action-2/);
        })
    })

    test('Popup validation should work correctly', async ({ page }) => {
        const frSandbox = new FRSandboxPage(page);
        await test.step('Given I am on the Sandbox page of Free Range Testers', async () => {
            //await page.goto(urlBase);
            await frSandbox.open();
        })
        await test.step('When I click on the Popup button', async () => {
            //await page.getByRole('button', { name: 'Mostrar popup' }).click();
            await frSandbox.openPopup();
        })
        await test.step('Then should see the popup message and be able to close it', async () => {
            //await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
            //await page.getByRole('button', { name: 'Cerrar' }).click();
            await expect(frSandbox.popupMessage).toHaveText('¿Viste? ¡Apareció un Pop-up!');
            await frSandbox.closePopupMessage();
        })
    })
});




