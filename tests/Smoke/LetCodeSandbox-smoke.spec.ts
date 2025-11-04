
import { test, expect } from '@playwright/test';
import { LCSandboxPage } from '../Pageobjects/LCSandboxPage';

test.describe('Smoke test on Letcode Sandbox page', () => {
    let letCodeSandboxPage : LCSandboxPage;
    
    test.beforeEach(async ({ page }) => {
        letCodeSandboxPage = new LCSandboxPage(page);
        await letCodeSandboxPage.open();
    });

    test('Dynamic button and hidden element should work correctly', async ({}) => {

        await letCodeSandboxPage.goToButtonSection();
        await letCodeSandboxPage.clickOnDynamicButtonHold();
        await expect(letCodeSandboxPage.delayedMessageVisible).toBeVisible();
    })

    test('Text field accepts user input and displays it correctly', async ({}) => {
        
        await letCodeSandboxPage.goToInputSection();
        await letCodeSandboxPage.typeTextIntoFullNameTextBox('Margarita');
        await expect(letCodeSandboxPage.fullNameTextBox).toBeEditable();
        await expect(letCodeSandboxPage.fullNameTextBox).toHaveValue('Margarita');
    })

    test('Checkbox selection should work correctly', async ({}) => {
        
        await letCodeSandboxPage.goToRadioSection();
        await letCodeSandboxPage.checkRememberMeCheckbox();
        await expect(letCodeSandboxPage.rememberMeCheckbox, 'The checkbox is not selected').toBeChecked();
        
        await letCodeSandboxPage.uncheckRememberMeCheckbox();
        await expect(letCodeSandboxPage.rememberMeCheckbox, 'The checkbox is selected').not.toBeChecked();
    })

    test('1.1 Radio button selection should work correctly', async ({}) => {
        
        await letCodeSandboxPage.goToRadioSection();
        await letCodeSandboxPage.selectRadioButton('Select any one', 'Yes');
        expect(await letCodeSandboxPage.isRadioButtonSelected('Select any one', 'Yes')).toBe(true);
        
        await letCodeSandboxPage.selectRadioButton('Cofirm you can select only one radio button', 'No');
        expect(await letCodeSandboxPage.isRadioButtonSelected('Cofirm you can select only one radio button', 'No')).toBe(true);

        await letCodeSandboxPage.selectRadioButton('Find the bug', 'No');
        expect(await letCodeSandboxPage.isRadioButtonSelected('Find the bug', 'No')).toBe(true);

        await letCodeSandboxPage.selectRadioButton('Find which one is selected', 'Bar');
        expect(await letCodeSandboxPage.isRadioButtonSelected('Find which one is selected', 'Bar')).toBe(true);

        await letCodeSandboxPage.selectRadioButton('Confirm last field is disabled', 'Going');
        expect(await letCodeSandboxPage.isRadioButtonSelected('Confirm last field is disabled', 'Going')).toBe(true);

    })    

    test('1.1 Fuit Dropdown selection should work correctly', async ({}) => {
        
        await letCodeSandboxPage.goToDropdownSection();
        await letCodeSandboxPage.selectFruitByLabel('Banana');
        await expect(letCodeSandboxPage.selectedMessageDisplayed).toContainText('Banana');
    })

    test('1.2 Fuit Dropdown selection should work correctly', async ({}) => {
        
        await letCodeSandboxPage.goToDropdownSection();
        await letCodeSandboxPage.selectFruitByLabelAndValue('Orange','2');
        const selected = await letCodeSandboxPage.getSelectedFruit();
        expect (selected.value).toBe('2');
        expect (selected.label).toBe('Orange');
    })

    test('Programming language dropdown selection should work correctly', async ({}) => {

        await letCodeSandboxPage.goToDropdownSection();
        await letCodeSandboxPage.selectProgrammingLanguageByValue('py');
        await expect(letCodeSandboxPage.selectedMessageDisplayed).toHaveText('You have selected Python')
    })

    test('Select the last programming language and print all the options should work correctly', async ({}) => {

        await letCodeSandboxPage.goToDropdownSection();
        await letCodeSandboxPage.selectProgrammingLanguageByValue('C#');
        await expect(letCodeSandboxPage.selectedMessageDisplayed).toHaveText('You have selected C#')
        console.log((await letCodeSandboxPage.getProgrammingLanguages().allInnerTexts()).join());
    })


    test('Upload file should work correctly', async ({}) => {

        await letCodeSandboxPage.goToFileSection();
        await letCodeSandboxPage.uploadFile();
        await expect(letCodeSandboxPage.selectedFileMessage).toBeVisible();
    })

});




