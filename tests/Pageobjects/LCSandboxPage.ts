
// pages/LCSandboxPage.ts
import {type Locator, type Page } from '@playwright/test';
import { holdThreeSeconds, pdfTestPath } from '../constants/common';

export class LCSandboxPage {

    private readonly url = 'https://letcode.in/test';
    private readonly page: Page;


    readonly buttonSection: Locator
    readonly dynamicButton: Locator
    readonly delayedMessageVisible: Locator


    readonly inputSection: Locator
    readonly fullNameTextBox: Locator

    readonly radioSection: Locator
    readonly rememberMeCheckbox: Locator


    readonly dropdownSection: Locator
    readonly fruitDropdown: Locator
    readonly selectedMessageDisplayed: Locator

    readonly programmingLanguageDropdown: Locator

    readonly fileSection: Locator
    readonly uploadFileSection: Locator
    readonly selectedFileMessage: Locator
    
    

    constructor(page: Page) {
        this.page = page;
        
    
                
        //Dynamic button
        this.buttonSection = page.getByRole('link', { name:  'Click' });
        this.dynamicButton = page.getByRole('button', { name: 'Button Hold!' });
        this.delayedMessageVisible = page.getByText('Button has been long pressed');

        //Text input
        this.inputSection = page.getByRole('link', { name: 'Edit' });
        this.fullNameTextBox = page.getByRole('textbox', { name: 'Enter first & last name' });

        //Checkbox
        this.radioSection = page.getByRole('link', { name: 'Toggle' });
        this.rememberMeCheckbox = page.getByRole('checkbox', { name: 'Remember me' });


        //Fruit Dropdown
        this.dropdownSection = page.getByRole('link', { name: 'Drop-Down' });
        this.fruitDropdown = page.locator('#fruits');
        this.selectedMessageDisplayed = page.getByText('You have selected');

        //Programming language Dropdown
        this.programmingLanguageDropdown = page.locator('#lang');

        //Upload file
        this.fileSection = page.getByRole('link', { name: 'File management' });
        this.uploadFileSection = page.getByLabel(' Choose a file… ');
        this,this.selectedFileMessage = page.getByText('Selected File');
        
    }


    // Navigation
    async open() {
        await this.page.goto(this.url);
    }

    //Dynamic button
    async goToButtonSection(){
       await this.buttonSection.click();
    }
    async clickOnDynamicButtonHold(){
        await this.dynamicButton.click({delay: holdThreeSeconds});
    }

    //Input 
    async goToInputSection(){
        await this.inputSection.click();
    }
    async typeTextIntofullNameTextBox(text: string){
        await this.fullNameTextBox.fill(text);
    }

    //Checkbox
    async goToRadioSection(){
        await this.radioSection.click();
    }
    async checkRememberMeCheckbox(){
        await this.rememberMeCheckbox.check();
    }
    async uncheckRememberMeCheckbox(){
        await this.rememberMeCheckbox.uncheck();
    }

    //Radio button (Option 1.1)

    private getFieldLocatorByTitle(title: string) {
        return this.page.locator('.field').filter({ hasText: title });
    }

    async selectRadioButton(title: string, optionText: string) {
        const locator = this.getFieldLocatorByTitle(title);
        await locator.getByLabel(optionText, { exact: true }).check();
    }

    async isRadioButtonSelected(title: string, optionText: string) {        
        const locator = this.getFieldLocatorByTitle(title);
        return locator.getByLabel(optionText, { exact: true }).isChecked();
    }    

    //Fruit Dropdown (option 1.1)

    async goToDropdownSection(){
        await this.dropdownSection.click();
    }
    async selectFruitByLabel(label: string) { 
        await this.fruitDropdown.selectOption({ label });
    }
    
    //Fruit Dropdown (option 1.2)

    async selectFruitByValue(value: string) {
        await this.fruitDropdown.selectOption(value);
    }
    async selectFruitByLabelAndValue(label: string, value: string) {
        await this.fruitDropdown.selectOption({ label, value });
    }
    async getSelectedFruit() {
  
        const value = await this.fruitDropdown.inputValue();

        const label = await this.page
        .locator(`#fruits option[value="${value}"]`)
        .textContent();

        return { value, label: label?.trim() || '' };
    }

    //Programming language Dropdown
    
    async selectProgramingLanguageByValue(value: string) {
        await this.programmingLanguageDropdown.selectOption(value);
    }

    getProgramingLanguages() {
        return this.programmingLanguageDropdown;
    }

    //Upload file

    async goToFileSection(){
        await this.fileSection.click();
    }

    async uploadFile(){
        await this.uploadFileSection.setInputFiles(pdfTestPath + '/TestingDoc.pdf');
    }

}







