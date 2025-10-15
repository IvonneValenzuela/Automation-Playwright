import { test, expect, APIRequestContext } from '@playwright/test';

const USER = process.env.GH_USER;
const REPO = process.env.GH_REPO;
const TOKEN = process.env.API_TOKEN;

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

    //const title = `[Feature] Iron my clothes`;
    const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] Iron my clothes'
        }
    });

    expect(newIssue.ok()).toBeTruthy();
    console.log('STATUS:', newIssue.status());    

    await page.goto(`https://github.com/${USER}/${REPO}/issues`);
    //await page.waitForSelector("a[data-hovercard-type='issue']");
    //const issueData = await newIssue.json();
    //console.log(issueData);
    const firstIssue = page.locator(`a[data-testid="issue-pr-title-link"]`).first();
    await expect(firstIssue).toHaveText('[Feature] Iron my clothes');


    // TODO: clean up the issue that has been created by deleting it
    await apiContext.delete(`/repos/${USER}/${REPO}/issues`);
    // console.log('STATUS:', response.status());
    // expect(response.ok()).toBeTruthy();
});
