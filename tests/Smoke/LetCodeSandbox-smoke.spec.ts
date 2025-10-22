
import { test, expect } from '@playwright/test';
import { LCSandboxPage, RadioLabels } from '../Pageobjects/LCSandboxPage';
import { RadioButtonOption,RadioButtonOption3, RadioButtonOption2 } from '../constants/common';


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
        await letCodeSandboxPage.typeTextIntofullNameTextBox('Margarita');
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
        expect(await letCodeSandboxPage.radioButtonSelected('Select any one', 'Yes')).toBe(true);
        
        await letCodeSandboxPage.selectRadioButton('Cofirm you can select only one radio button', 'No');
        expect(await letCodeSandboxPage.radioButtonSelected('Cofirm you can select only one radio button', 'No')).toBe(true);

        await letCodeSandboxPage.selectRadioButton('Find the bug', 'No');
        expect(await letCodeSandboxPage.radioButtonSelected('Find the bug', 'No')).toBe(true);

        await letCodeSandboxPage.selectRadioButton('Find which one is selected', 'Bar');
        expect(await letCodeSandboxPage.radioButtonSelected('Find which one is selected', 'Bar')).toBe(true);

        await letCodeSandboxPage.selectRadioButton('Confirm last field is disabled', 'Going');
        expect(await letCodeSandboxPage.radioButtonSelected('Confirm last field is disabled', 'Going')).toBe(true);

    })

    test('1.2 Radio button selection should work correctly', async ({}) => {
        
        await letCodeSandboxPage.goToRadioSection();
        await letCodeSandboxPage.selectRadioYesOrNoByText(RadioLabels.SelectAnyOne, RadioButtonOption.Yes);  
        expect(letCodeSandboxPage.selectRadioYesOrNoByText).toBeTruthy();//Como se valida que se ahya elegido el Yes

        await letCodeSandboxPage.selectRadioYesOrNoByText(RadioLabels.CofirmYouCanSelectOnlyOneRadioButton, RadioButtonOption.No);
        expect(letCodeSandboxPage.selectRadioYesOrNoByText).toBeTruthy();

        await letCodeSandboxPage.selectRadioYesOrNoByText(RadioLabels.FindTheBug, RadioButtonOption.Yes);
        expect(letCodeSandboxPage.selectRadioYesOrNoByText).toBeTruthy();

        await letCodeSandboxPage.selectRadioFooBarByText(RadioButtonOption2.Foo);
        expect(letCodeSandboxPage.selectRadioFooBarByText).toBeTruthy();

        await letCodeSandboxPage.selectRadioGoingNotGoingMaybeByText(RadioButtonOption3.NotGoing);
        expect (letCodeSandboxPage.selectRadioGoingNotGoingMaybeByText).toBeTruthy();

    })
    

    test('1.1 Fuit Dropdown selection should work correctly', async ({}) => {
        
        await letCodeSandboxPage.goToDropdownSection();
        await letCodeSandboxPage.selectFruitByLabel('Banana');
        await expect(letCodeSandboxPage.selectedMessageDisplayed).toContainText('Banana');
    })

    test('1.2 Fuit Dropdown selection should work correctly', async ({}) => {
        
        await letCodeSandboxPage.goToDropdownSection();
        await letCodeSandboxPage.selectFruitByLabelAndValue('Mango','1');
        const selected = await letCodeSandboxPage.getSelectedFruit();
        expect (selected.value).toBe('1');
        expect (selected.label).toBe('Mango');
    })


    test('Programming language dropdown selection should work correctly', async ({}) => {

        await letCodeSandboxPage.goToDropdownSection();
        await letCodeSandboxPage.selectProgramingLanguageByValue('py');
        await expect(letCodeSandboxPage.selectedMessageDisplayed).toHaveText('You have selected Python')
        //await expect(letCodeSandboxPage.selectedMessageDisplayed).toContainText('Python')  
    })

    test('Select the last programming language and print all the options should work correctly', async ({ page }) => {

        await letCodeSandboxPage.goToDropdownSection();
        await letCodeSandboxPage.selectProgramingLanguageByValue('C#');
        await expect(letCodeSandboxPage.selectedMessageDisplayed).toHaveText('You have selected C#')
        console.log();//no se como hacerlo
    })


    test('Upload file should work correctly', async ({}) => {

        await letCodeSandboxPage.goToFileSection();
        await letCodeSandboxPage.uploadFile();
        await expect(letCodeSandboxPage.selectedFileMessage).toContainText('Selected File');
    })

});




