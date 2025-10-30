import { test, expect, APIRequestContext } from '@playwright/test';

const USER = process.env.GH_USER;
const REPO = process.env.GH_MAIN_REPO;
const TOKEN = process.env.API_MAIN_TOKEN;
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const THREE_SECONDS = 3000;

let apiContext: APIRequestContext;
let createdIssueNumber: number;


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
    // 🧹 Clean up: close the created issue
    if (createdIssueNumber) {
    const closeIssue = await apiContext.patch(
      `/repos/${USER}/${REPO}/issues/${createdIssueNumber}`,
      {
        data: { state: 'closed' },
      }
    );
    console.log(`🧹 Closed issue #${createdIssueNumber}:`, closeIssue.status());
    }
});

test('Newest created issue appears first in the list', async ({ page }) => {
    const title = `[Feature] Iron my clothes`;

    // --- 1️⃣ Create Issue ---
    const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
        data: {title}
    });

    expect(newIssue.ok()).toBeTruthy();
    const issueData = await newIssue.json();
    createdIssueNumber = issueData.number;
    console.log('✅ Created issue #', createdIssueNumber);

    await delay(THREE_SECONDS);   

    // --- 2️⃣ Verify on GitHub UI --
    await page.goto(`https://github.com/${USER}/${REPO}/issues`); 
    const firstIssue = page.locator(`a[data-testid="issue-pr-title-link"]`).first();
    await expect(firstIssue).toHaveText(title);

});

