import {type Locator, type Page } from '@playwright/test';

export class FRSandboxPage {
    
    private readonly url = 'https://thefreerangetester.github.io/sandbox-automation-testing/';

    readonly page: Page;
    readonly dynamicButton: Locator
    readonly delayedGhostMessage: Locator 
    readonly textBoxUnAburridoTexto: Locator
    readonly textDisplayedOnField : Locator

    constructor(page: Page) {
        this.page = page;
        this.dynamicButton = page.getByRole('button', { name: 'Hacé click para generar un ID' });
        this.delayedGhostMessage = page.getByText('OMG, aparezco después de 3 segundos de haber hecho click en el botón 👻.');
        this.textBoxUnAburridoTexto = page.getByRole('textbox', { name: 'Un aburrido texto' })
        this.textDisplayedOnField = page.getByRole('textbox', {name: 'Un aburrido texto'})
    }

    async open() {
        await this.page.goto(this.url);
    }
    
    async clickOnDynamicButton(){
       await this.dynamicButton.click();
    }

    async fillFieldInput(textTyped:string = 'Testing ♥'){
        await this.textBoxUnAburridoTexto.fill(textTyped);
    }

    
    



}