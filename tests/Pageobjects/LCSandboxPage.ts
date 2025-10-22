
// pages/LCSandboxPage.ts
import {type Locator, type Page } from '@playwright/test';
import { holdThreeSeconds, RadioButtonOption, RadioButtonOption2, RadioButtonOption3, pdfTestPath } from '../constants/common';
import path from 'path';

export enum RadioLabels {
    SelectAnyOne = "Select any one", 
    CofirmYouCanSelectOnlyOneRadioButton = "Cofirm you can select only one radio button",
    FindTheBug = "Find the bug"
}

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

    private groupByTitle(title: string) {
        return this.page.locator('.field').filter({ hasText: title });
    }

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

    async selectRadioButton(title: string, optionText: string) {
        const group = this.groupByTitle(title);
        await group.getByLabel(optionText, { exact: true }).check();
    }

    async radioButtonSelected(title: string, optionText: string) {
        const group = this.groupByTitle(title);
        return group.getByLabel(optionText, { exact: true }).isChecked();
    }

    //Radio button (Option 1.2)

    async selectRadioYesOrNoByText(
        radioLabel: RadioLabels, 
        radioButtonOption: RadioButtonOption) {  
        let radio: Locator;

        if (radioLabel === RadioLabels.SelectAnyOne) {
            radio = this.page.getByText(radioButtonOption.toString()).first();
                         
        } else if (radioLabel === RadioLabels.CofirmYouCanSelectOnlyOneRadioButton) {
            radio = this.page.getByText(radioButtonOption.toString()).nth(1);

        } else if (radioLabel === RadioLabels.FindTheBug) {
            radio = this.page.getByText(radioButtonOption.toString()).nth(2);
        } else 
        {
            radio = this.page.getByText(radioButtonOption.toString()).nth(2);
        }
        //const radio = this.page.getByText(radioButtonOption.toString(), { exact: true });        
        await radio.check();  
    }

    async selectRadioFooBarByText(radioButtonOption2: RadioButtonOption2) {  
        const radio = this.page.getByText(radioButtonOption2.toString());
        await radio.check();
    }  

    async selectRadioGoingNotGoingMaybeByText(radioButtonOption3: RadioButtonOption3) {  
        const radio = this.page.getByText(radioButtonOption3.toString());
        await radio.check();  
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
    
    async selectProgramingLanguageByValue(value:string){
        await this.programmingLanguageDropdown.selectOption(value);
    }

    //Upload file

    async goToFileSection(){
        await this.fileSection.click();
    }

    async uploadFile(){
        await this.uploadFileSection.setInputFiles(pdfTestPath + '/TestingDoc.pdf');
    }

}







