import { test, expect, request } from '@playwright/test';

const USER = process.env.GH_USER;
const REPO = process.env.GH_REPO;
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const THREE_SECONDS = 3000;

test.beforeAll(async ({ request }) => {//Using to create a new repo that we will delete after use it 
    const response = await request.post('user/repos', {
        data: {
            name: REPO
        }
    });
    expect(response.ok()).toBeTruthy();
});

test('Verify the ability to create a bug in the repository', async ({ request }) => {  
    
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        
        data: {
            title: '[Bug] API test posting a new issue',
            body: 'We are the champions, my friends! And we will keep on fighting til the end',
        }
    });
    //expect(newIssue.ok()).toBeTruthy();
    expect(newIssue.status()).toBe(201);
    console.log('STATUS:', newIssue.status());
    
    await delay(THREE_SECONDS);

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Bug] API test posting a new issue',
        body: 'We are the champions, my friends! And we will keep on fighting til the end'
    }));
});

test('Verify the ability to create a feature request', async ({ request }) => {
    
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] Quiero que haga helados',
            body: 'Estaría buenísimo que el repo haga helados 🍦',
        }
    });
    expect(newIssue.ok()).toBeTruthy();
    
    await delay(THREE_SECONDS);

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    //console.log(await issues.json());
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Feature] Quiero que haga helados',
        body: 'Estaría buenísimo que el repo haga helados 🍦'
    }));
});

test.afterEach(async ({ request }) => { //Using to delete the repo with the issues created on it
    const response = await request.delete(`/repos/${USER}/${REPO}`);
    expect(response.ok()).toBeTruthy();
});