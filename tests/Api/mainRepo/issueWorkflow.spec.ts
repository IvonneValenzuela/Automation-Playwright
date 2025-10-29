import { test, expect, APIRequestContext } from '@playwright/test';

const USER = process.env.GH_USER;
const REPO = process.env.GH_MAIN_REPO;
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const THREE_SECONDS = 3000;


test('Verify the ability to create a bug in the repository', async ({ request }) => { 
    
    await createVerifyAndDeleteIssue(request, '[Bug] API test posting a new issue', 'We are the champions, my friends! And we will keep on fighting til the end');
});

test('Verify the ability to create a feature request', async ({ request }) => {

    await createVerifyAndDeleteIssue(request, '[Feature] Quiero que haga helados', 'Estaría buenísimo que el repo haga helados 🍦');    
});

async function createVerifyAndDeleteIssue (request: APIRequestContext, title: string, body: string) {
    
    // --- CREATE ISSUE ---
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: title,
            body: body
        }
    });
    expect(newIssue.status()).toBe(201);
    const createdIssue = await newIssue.json();
    console.log('✅ Created issue number:', createdIssue.number);

    // --- WAIT FOR GITHUB TO SYNC ---
    await delay(THREE_SECONDS);

    // --- VERIFY ISSUE EXISTS ---
    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();

    const issuesList = await issues.json();
    const issueFound = issuesList.find(
        (issue: any) => issue.title === title
    );
    expect(issueFound).toBeTruthy();
    console.log('🕵️ Found issue:', issueFound.number);

    // --- CLOSE ISSUE (clean up) ---
    const closeIssue = await request.patch(
        `/repos/${USER}/${REPO}/issues/${issueFound.number}`,
        {
            data: { state: 'closed' },
        }
    );

    expect(closeIssue.ok()).toBeTruthy();
    console.log('🧹 Closed issue:', issueFound.number);
}

