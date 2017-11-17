//
// ─── HATCHD UI TESTS ────────────────────────────────────────────────────────────
//

import puppeteer from 'puppeteer';

// the url to the page we are going to run our tests on
const URL = 'https://hatchd.com.au';
//const URL = 'http://mac.local/ui-tesing/';

let page;
let browser;

// the width and height of the testing browser
const winWidth = 1920;
const winHeight = 1080;

// hook to run before all testing
beforeAll(async () => {
    // open the testing browser using our options
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: [`--window-size=${winWidth},${winHeight}`]
    });
    page = await browser.newPage();
    await page.setViewport({ width: winWidth, height: winHeight });
});

// hook to run after all testing
afterAll(() => {
    // finished testing so close the browser
    browser.close();
});

// test the seo
describe('SEO', () => {

    test('Title must be present', async () => {
        await page.goto(`${URL}`);
        const title = await page.title();
        // test that the title exists with a regex that will pass any string but an empty one
        expect(title).toMatch(/.*\S.*/);
    }, 90000);

    test('Meta description must be present', async () => {
        await page.goto(`${URL}`);
        const description = await page.$eval('meta[name="description"]', el => el.content);
        // test that the description exists with a regex that will pass any string but an empty one
        expect(description).toMatch(/.*\S.*/);
    }, 90000);

    test('H1 must be present', async () => {
        await page.goto(`${URL}`);
        const title = await page.$eval('h1', el => el.textContent);
        // test that a H1 exists with a regex that will pass any string but an empty one
        expect(title).toMatch(/.*\S.*/);
    }, 90000);

});

// test the menu functionality
describe('Menu', () => {

    test('Menu must open when hamburger clicked', async () => {
        await page.goto(`${URL}`);
        await page.click('.js-toggle-nav');
        const navVisible = await page.$eval('.nav-primary', el => el.style.visibility);
        setTimeout(() => {
            expect(navVisible).toBe('visible');
        }, 100);
    }, 90000);

});





