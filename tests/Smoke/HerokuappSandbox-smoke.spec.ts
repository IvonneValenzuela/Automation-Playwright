import { test, Browser, Page, expect, chromium} from '@playwright/test';
import { Console } from 'console';
import path from 'path';


(async () => {
    

    const herokuAppUrl = 'https://the-internet.herokuapp.com/';


    
    test.describe('Automation on HerokuApp & Letcode page', () => {


        
        test('1. Navigate and interact with Dynamic content link', async ({ page }) => {
            await test.step('Given I open the HerokuApp homepage', async () => {
                await page.goto(herokuAppUrl);
                await page.getByRole('link', { name: 'Dynamic Content' }).click();
            })
            await test.step('I should be able to click on the Click here link', async () => {
                await page.getByRole('link', { name: 'click here' }).click();
            })  
        })


        test('2. Dynamic button and hidden element', async ({ page }) => {
            await test.step('Given I am on the HerokuApp homepage', async () => {
                await page.goto(herokuAppUrl);
                await page.getByRole('link', { name: 'Dynamic Controls' }).click();
            })
            
            await test.step('I should be able to click on the "Enable" button', async () => {
                await page.getByRole('button', { name: 'Enable' }).click();
            
            })  
        })
    
        test ('3. Fill text fields on form authentication', async ({ page }) => {
            await test.step('Given I am on the HerokuApp “Form Authentication” page', async () => {
                await page.goto(herokuAppUrl);
                await page.getByRole('link', { name: 'Form Authentication' }).click();
            })
            await test.step('I should be able to benter Username and Password', async () => {
                const text1 = 'Automation project ♥';
                const userNameTextBox = page.getByRole('textbox', { name: 'Username' });

                await expect(userNameTextBox).toBeEditable();
                await userNameTextBox.fill(text1);
                await expect(userNameTextBox).toHaveValue(text1); //este no funciona sin las constantes definidas?
                await page.getByRole('textbox', { name: 'Password' }).fill('123456789');
            })
        })
    
        test('4. Select and unselect checkboxes', async ({ page }) => {
            await test.step('Given I am on the HerokuApp page', async () => {
                await page.goto(herokuAppUrl);
                await page.getByRole('link', { name: 'Checkboxes' }).click();
            })
            await test.step('I should be able to select and unselect the checkboxes', async () => {
                await page.getByRole('checkbox').first().check();
                await page.getByRole('checkbox').first().uncheck();
                await page.getByRole('checkbox').nth(1).check();
                await page.getByRole('checkbox').nth(1).uncheck();
            })
            await test.step('Checking the assersion Expect', async () => {
                await page.getByRole('checkbox').first().uncheck();
                await expect(page.getByRole('checkbox').first()).not.toBeChecked();
            })
        })

    
    })
           

})();


