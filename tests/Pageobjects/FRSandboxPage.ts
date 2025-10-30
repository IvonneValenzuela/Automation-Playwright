// pages/FRSandboxPage.ts

import {type Locator, type Page } from '@playwright/test';

export class FRSandboxPage {
    private readonly url = 'https://thefreerangetester.github.io/sandbox-automation-testing/';
    private readonly page: Page;

    // Buttons & messages

    readonly dynamicButton: Locator
    readonly delayedGhostMessage: Locator 
    
    // Text input
    readonly textInput : Locator

    // Checkbox & radio
    readonly heladoCheckBox: Locator
    readonly siRadioButton: Locator

    // Select
    readonly tennisDropdownOption: Locator

    // Dropdown (día de la semana)
    readonly dayDropdownButton: Locator
    private dayOption = (day: string) => this.page.getByRole('link', { name: day });
    readonly martesDropdown: Locator

    // Popup
    readonly popupButton: Locator
    readonly popupMessage: Locator
    readonly closePopup: Locator

    constructor(page: Page) {
        this.page = page;

        //Dynamic button
        this.dynamicButton = page.getByRole('button', { name: 'Hacé click para generar un ID' });
        this.delayedGhostMessage = page.getByText('OMG, aparezco después de 3 segundos de haber hecho click en el botón 👻.');

        //Text input
        this.textInput = page.getByRole('textbox', {name: 'Un aburrido texto'});

        // Checkbox & Radio
        this.heladoCheckBox = page.getByLabel('Helado 🍧');
        this.siRadioButton = page.getByLabel('si');

        // Select
        this.tennisDropdownOption = page.getByLabel('Dropdown');

        // Dropdown (día de la semana)
        this.dayDropdownButton = page.getByRole('button', { name: 'Día de la semana'});
        this.martesDropdown = page.getByRole('link', { name: 'Martes' });

        // Popup
        this.popupButton = page.getByRole('button', { name: 'Mostrar popup' });
        this.closePopup = page.getByRole('button', { name: 'Cerrar' });
        this.popupMessage = page.getByText('¿Viste? ¡Apareció un Pop-up!');
    }

    // Navigation
    async open() {
        await this.page.goto(this.url);
    }
    
    //Dynamic ID button
    async clickOnDynamicButton(){
       await this.dynamicButton.click();
    }

    
    async fillTextInput(textTyped : string){
        await this.textInput.fill(textTyped);
    }

    //Checkbox
    async checkHeladoCheckbox(){
        await this.heladoCheckBox.check();
    }
    async uncheckHeladoCheckbox(){
        await this.heladoCheckBox.uncheck();
    }
    
    //Radio Buttons
    async selectSiRadioButton(){
        await this.siRadioButton.check();
    }
    async selectTennisOption(){
        await this.tennisDropdownOption.selectOption('Tennis');
    }

    //Dropdown
    async selectDay(dayName: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo') {
        await this.dayDropdownButton.click();
        const option = this.dayOption(dayName);
        await option.waitFor({ state: 'visible' });
        await option.click();
    }
    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }
    
    //Popup Messages
    async openPopupMessage(){
        await this.popupButton.click();
    }
    async closePopupMessage(){
        await this.closePopup.click();
    }

}