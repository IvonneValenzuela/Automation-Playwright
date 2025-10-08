import { test, expect, Locator} from '@playwright/test';
import path from 'path';

(async () => {
    
    const letCodeUrl = 'https://letcode.in/';
    
    test.describe('Automation practising assertions on Letcode page', () => {


        test('Select and unselect checkboxes', async ({ page }) => {

            await test.step('Given I am on the LetCode page', async () => {
                await page.goto(letCodeUrl);
                await page.getByRole('link', { name: 'Explore Workspace' }).click();
                await page.getByRole('link', { name:  'Toggle' }).click();
            })
            await test.step('When I check a checkbox', async () => {
                await page.getByRole('checkbox', { name: 'Remember me' }).check();
                await expect(page.getByRole('checkbox', { name: 'Remember me' }),'The check box was not selected').toBeChecked(); //Assertion
            })
            await test.step('When I uncheck a checkbox', async () => {
                await page.getByRole('checkbox', { name: 'Remember me' }).uncheck();
                await expect(page.getByRole('checkbox', { name: 'Remember me' }),'The check box was selected').not.toBeChecked(); //Assertion
            })
        })
        
        test ('Validation of text fields', async ({ page }) => {
            await test.step('Given I am on the LetCode page', async () => {
                await page.goto(letCodeUrl);
                await page.getByRole('link', { name: 'Explore Workspace' }).click();
                await page.getByRole('link', { name:  'Edit' }).click();
            })
            await test.step('I should be able to enter text on Enter your full name field ', async () => {
                const text1 = 'Automation project ♥';
                const userNameTextBox = page.getByRole('textbox', { name: 'Enter first & last name' });

                await expect(userNameTextBox).toBeEditable(); //Assertion
                await userNameTextBox.fill(text1);
                await expect(userNameTextBox).toHaveValue(text1); //Assertion
            })
        })
    
        test ('Validation of Radio buttons', async ({ page }) => {
            await test.step('Given I am on the LetCode page', async () => {
                await page.goto(letCodeUrl);
                await page.getByRole('link', { name: 'Explore Workspace' }).click();
                await page.getByRole('link', { name:  'Toggle' }).click();
            })
            await test.step('I should be able to select different radio button options', async () => {
                await page.getByText('Yes').first().check();
                await expect(page.getByText('Yes').first(),'The radio button was not selected').toBeChecked(); //Assertion
            })
        })

        test('Select a fruit from the dropdown (loop)', async ({ page }) => {
            await test.step('Given I am on the LetCode page', async () => {
                await page.goto(letCodeUrl);
                await page.getByRole('link', { name: 'Explore Workspace' }).click();
                await page.getByRole('link', { name:  'Drop-Down' }).click();
            })
            await test.step('I should be able to choose a fruit from the dropdown list', async () => {
               
                const fruits = ['Apple','Mango','Orange','Banana','Pine Apple'];

                for(let fruit of fruits){
                    const element= await page.$(`select#fruits > option:is(:text("${fruit}"))`);
                    if (element){
                        console.log(`this fruit '${fruit}' is present`);
                    }
                    else {
                        throw new Error(`this fruit '${fruit}' is not present`); //Assertion
                    }
                }
            })
        })

        test('Validation of the colum Last Name on the static table', async ({ page }) => {
            await test.step('Given I am on the LetCode page', async () => {
                await page.goto(letCodeUrl);
                await page.getByRole('link', { name: 'Explore Workspace' }).click();
                await page.getByRole('link', { name:  'Simple table' }).click();
                //await page.getByRole('link', { name:  'Simple table' }).click();
            })
            await test.step('I should be able to validate the elements under the colum Last name on the static table ', async () => {               
                
                const valueColumList = await page.locator('#simpletable tbody tr > td:first-child').allTextContents();
                const expectingValues = ['Koushik','Yashwanth','Iron'];

                expect(valueColumList).toEqual(expectingValues);
            })
        })

        test('Values order change after pressing the arrow button', async ({ page }) => {
            
            const waitThreeSeconds = 3100;

            await test.step('Given I am on the LetCode page', async () => {
                await page.goto(letCodeUrl);
                await page.getByRole('link', { name: 'Explore Workspace' }).click();
                await page.getByRole('link', { name:  'Simple table' }).click();
            })

            await test.step('Values order change', async () => {

                //arrange
                const dessertTable = page.locator('table:has(th:has-text("Dessert (100g)"))');
                const valuesDynamicTB = await dessertTable.locator('tr td').allTextContents();
                console.log('Values before clicking the arrow:', valuesDynamicTB);
               
                //act
                await dessertTable.locator('th:has-text("Dessert (100g)")').click({ delay: waitThreeSeconds });
                const valuesAfterClick = await dessertTable.locator('tr td').allTextContents();
                console.log('Values after clicking the arrow:', valuesAfterClick);

                //assert
                expect(valuesDynamicTB).not.toEqual(valuesAfterClick);
            })
        })


        //SOFT ASSERTIONS//

        test.fail('4. Select and unselect checkboxes with soft assersions', async ({ page }) => {

            await test.step('Given I am on the LetCode page', async () => {
                await page.goto(letCodeUrl);
                await page.getByRole('link', { name: 'Explore Workspace' }).click();
                await page.getByRole('link', { name:  'Toggle' }).click();
            })
            await test.step('Validating checkbox selection are visible', async () => {
                await expect.soft(page.getByText('Remember mee'),'the element Remember me was not found').toBeVisible();//This is failing with the porpuse to test the soft assertion
                await expect.soft(page.getByText('I agree to the FAKE terms and conditions')).toBeVisible();
                //Una aserción suave valida una condición pero no detiene la ejecución de la prueba si falla. En lugar de eso, registra el fallo y permite que el test siga ejecutándose.
                //Las aserciones suaves permiten verificar múltiples condiciones en una misma prueba sin detenerse en el primer fallo. Son útiles cuando quieres tener una visión completa de todos los problemas en una ejecución.
            })
        })

        test('Checking the Pop-up element', async ({ page }) => {

            await test.step('Given I am on the LetCode page', async () => {
                await page.goto(letCodeUrl);
                await page.getByRole('link', { name: 'Explore Workspace' }).click();
                await page.getByRole('link', { name:  'Dialog' }).click();
            })
            await test.step('I should be able to see the pop-up element', async () => {
                await page.getByRole('button', { name: 'Modern Alert' }).click();
            })
            await test.step('I should be able to close the pop-up element', async () => {
                await expect(page.getByText('Modern Alert - Some people address me as sweet alert as well')).toHaveText('Modern Alert - Some people address me as sweet alert as well');
                await page.getByRole('button', { name: 'close', exact: true }).click();
            }) 
        })   
    })       
})();




