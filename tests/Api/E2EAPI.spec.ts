import { test, expect, APIRequestContext } from '@playwright/test';

const USER = process.env.GH_USER;
const REPO = process.env.GH_MAIN_REPO;
const TOKEN = process.env.API_MAIN_TOKEN;
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const THREE_SECONDS = 3000;

let apiContext: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        baseURL: 'https://api.github.com',
        extraHTTPHeaders: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': `token ${TOKEN}`, 
        },
    });
});

test.afterAll(async ({ }) => {
    await apiContext.dispose();
});

test('Newest created issue appears first in the list', async ({ page }) => {

    const title = `[Feature] Iron my clothes`;
    const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
        data: {title}
    });

    expect(newIssue.ok()).toBeTruthy();
    console.log('STATUS:', newIssue.status()); 
    await delay(THREE_SECONDS);   

    await page.goto(`https://github.com/${USER}/${REPO}/issues`); 
    const firstIssue = page.locator(`a[data-testid="issue-pr-title-link"]`).first();
    await expect(firstIssue).toHaveText('[Feature] Iron my clothes');


    // TODO: clean up the issue that has been created by deleting it
    //await apiContext.delete(`/repos/${USER}/${REPO}/issues`);
    // console.log('STATUS:', response.status());
    // expect(response.ok()).toBeTruthy();
});
