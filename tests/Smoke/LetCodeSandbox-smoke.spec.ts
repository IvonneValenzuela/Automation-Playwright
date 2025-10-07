import { test, expect} from '@playwright/test';
import path from 'path';

(async () => {
    
    const letCodeUrl = 'https://letcode.in/test';
    const testingProjectText = 'Testing Project';
    const pdfTestPath = path.join(__dirname, '../pdfprueba');
    const threeSeconds = 3100;

    
    test.describe('Smoke test on Letcode Sandbox page', () => {

        test('Dynamic button and hidden element should work correctly', async ({ page }) => {

            await test.step('Given I am on the LetCode Button page', async () => {
                await page.goto(letCodeUrl);
                await page.getByRole('link', { name:  'Click' }).click();
            })
            await test.step('When I click and hold the "Botton Hold!" dynamic button', async () => {
                await page.getByRole('button', { name: 'Button Hold!' }).click({ delay: threeSeconds });
            }) 
            await test.step('Then I should see the delayed message', async () => {
                await expect(page.getByText('Button has been long pressed')).toBeVisible();
            })
        })
    
        test ('Text field should accept and display input correctly', async ({ page }) => {
            const fullNameTextBox = page.getByRole('textbox', { name: 'Enter first & last name' });
            
            await test.step('Given I am on the LetCode Input page', async () => {
                await page.goto(letCodeUrl);
                await page.getByRole('link', { name:  'Edit' }).click();
            })
            await test.step('When I type text into the "Enter your full Name" field', async () => {
                await fullNameTextBox.fill(testingProjectText);
            })
            await test.step('Then the text should be displayed in the "Enter your full Name" field', async () => {
                await expect(fullNameTextBox).toBeEditable();
                await expect(fullNameTextBox).toHaveValue(testingProjectText); 
            })
        })
    
        test('Checkbox selection should work correctly', async ({ page }) => {
            const remembermeCheckBox = page.getByRole('checkbox', { name: 'Remember me' });

            await test.step('Given I am on the LetCode Checkboxes page', async () => {
                await page.goto(letCodeUrl);
                await page.getByRole('link', { name:  'Toggle' }).click();
            })
            await test.step('When I check the "Remember me" checkbox', async () => {
                await remembermeCheckBox.check();
            })
            await test.step('Then it should be checked', async () => {
                await expect(remembermeCheckBox).toBeChecked();
            })
             await test.step('When I uncheck the "Remember me" checkbox', async () => {
                await remembermeCheckBox.uncheck();
            })
            await test.step('Then it should be unchecked', async () => {
                await expect(remembermeCheckBox).not.toBeChecked();
            })
        })

        test('Radio button selection should work correctly', async ({ page }) => {
            const optionRB1 = page.getByText('Yes').first();
            const optionRB2 = page.getByText('Yes').nth(1);
            const optionRB3 = page.getByText('No').nth(2);
            const optionRB4 = page.getByText('Foo');
            const optionRB5 = page.getByText('Not going');

            await test.step('Given I am on the LetCode Radio Button page', async () => {
                await page.goto(letCodeUrl);
                await page.getByRole('link', { name:  'Toggle' }).click();
            })
            await test.step('When I select "Yes" on the first and second radio buttons, and "No" on the third radio button', async () => {
                await optionRB1.check();
                await optionRB2.check();
                await optionRB3.check();
            })
            await test.step('Then the first and second "Yes" and the third "No" radio buttons should be selected', async () => {
                await expect(optionRB1).toBeChecked();
                await expect(optionRB2).toBeChecked();
                await expect(optionRB3).toBeChecked();
            })
            await test.step('When I select the "Foo" on the fourth and "Not going" on the fifth radio button', async () => {
                await optionRB4.check();
                await optionRB5.check();
            })
            await test.step('Then the "Foo" on the fourth and "Not going" on the fifth radio button should be selected', async () => {
                await expect(optionRB4).toBeChecked();
                await expect(optionRB5).toBeChecked();
            })
        })

        test('Dropdown selection should work correctly', async ({ page }) => {
            const mangoValue='1';

            await test.step('Given I am on the LetCode Dropdown page', async () => {
                await page.goto(letCodeUrl);
                await page.getByRole('link', { name:  'Drop-Down' }).click();
            })
            await test.step('When I select "Mango" from the dropdown', async () => {
                await page.locator('#fruits').selectOption(mangoValue);// TODO: define '1' as a constant    
            })
            await test.step('Then "Mango" should be selected on the dropdown and a message should appear', async () => {
                //await expect(page.locator('#fruits')).toContainText("Mango"); Another way to verify the assertion
                await expect(page.locator('#fruits')).toHaveValue(mangoValue);
                await expect(page.getByText('You have selected Mango')).toBeVisible();
            })
        })

        
        test('Programming language selection from dropdown menu should work correctly', async ({ page }) => {

            await test.step('Given I am on the LetCode Dropdown page', async () => {
                await page.goto(letCodeUrl);
                await page.getByRole('link', { name:  'Drop-Down' }).click();
            })
            await test.step('When I select "Python" from the dropdown', async () => {
                await page.locator('#lang').selectOption('Python');
            })
            await test.step('Then the dropdown should display "Python"', async () => {
                await expect(page.locator('#lang')).toContainText('Python'); 
                await expect(page.locator('#lang')).toHaveValue('py');
                
                /** (copilot suggestion)
                 Best practice:
                    - Use toHaveValue for reliable, programmatic checks.
                    - Use toContainText if you need to verify the displayed text for the user.
                    For most automation scenarios, toHaveValue is preferred for dropdowns. You can use both together for thorough validation.                 
                 */
            }) 
        })
        
        test('Select the last programming language and print all the options should work correctly', async ({ page }) => {

            await test.step('Given I am on the LetCode Dropdown page', async () => {
                await page.goto(letCodeUrl);
                await page.getByRole('link', { name:  'Drop-Down' }).click();
            })
            await test.step('When I select the last programming language and print all the language options', async () => {

                //finding the last option without haveing to explicitly put 'C#
                //const options = await page.locator('#lang option').all();
                //const lastOptionValue = await options[options.length - 1].getAttribute('value');
                //await page.locator('#lang').selectOption(lastOptionValue!);
        
                //await page.locator('#lang').selectOption('C#');// 50ms - Another way 
                //await page.locator('#lang').selectOption('sharp');// 40ms - Another way
                await page.locator('#lang').selectOption({ label: 'C#' }); // 24ms (more efficient)
            })
            await test.step('Then the selected option should be "C#"', async () => {
                await expect(page.locator('#lang')).toHaveValue('sharp')
                console.log("All options:", (await page.locator('#lang').allInnerTexts()).join());
            })
            
        })
        
        test('Select "India" option using value & print the selected value should work correctly', async ({ page }) => {

            await test.step('Given I am on the LetCode Dropdown page', async () => {
                await page.goto(letCodeUrl);
                await page.getByRole('link', { name:  'Drop-Down' }).click();
            })
            await test.step('When I select "India" from the country dropdown and print it', async () => {
                await page.locator('#country').selectOption('India');
            })
            await test.step('Then the selected option should be "India"', async () => {
                await expect(page.locator('#country')).toHaveValue('India')
                console.log("Select value:", await page.locator('#country').selectOption('India'));
            })
        })
    
        test('Upload file should work correctly', async ({ page }) => {

            await test.step('Given I am on the LetCode File Management page', async () => {
                await page.goto(letCodeUrl);
                await page.getByRole('link', { name:  'File management' }).click();
            })
            await test.step('When I upload a file', async () => {
                await page.getByLabel(' Choose a file… ').setInputFiles(pdfTestPath + '/TestingDoc.pdf'); 
            })
            await test.step('Then a file should be uploaded successfully', async () => {
                await expect(page.getByText('Selected File')).toBeVisible();
            })           
        })
    
        test.fail('Drag and Drop functionality should work correctly', async ({ page }) => {
            //Test is not working
            const draggable = page.locator('#draggable'); 
            const dropTarget = page.locator('#droppable');

            await test.step('Given I am on the LetCode Drop page', async () => {
                await page.goto(letCodeUrl);
                await page.getByRole('link', { name:  'AUI - 2' }).click();
            })
            await test.step('When I drag the Green element to the purple one', async () => {
                await draggable.dragTo(dropTarget);
            })
            await test.step('Then the green element should be dragged successfully', async () => {
                await expect(dropTarget).toContainText('Drag me to my target');
            })   

        })
        
    })

})();


