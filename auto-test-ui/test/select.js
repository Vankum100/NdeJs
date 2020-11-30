const {Browser, By, Key, until} = require("selenium-webdriver");
const {suite} = require("selenium-webdriver/testing");
const assert = require('assert');
const ExamplePage = require('../pageObject/select.js');

require('geckodriver');
require('chromedriver');

suite(function(env) {
    describe('Dropdown and Radio Selection', function () {
        this.timeout(45000);
        let driver;
        let page;

        before(async function() {
            driver = env.builder().build();
            page = new ExamplePage(driver);
            page.open();
        });

        it('Updates with Selected DropDown Option ', async function() {
            await page.clickOption('option3');
            await page.submit();
            let results = await driver.findElement(page.locators.formResults);
            let text = await results.getText();
            assert(text.includes("option3"));
        });
        it('Updates with Selected RadioButton Option ', async function() {
            await page.clickRadioButton('radio2');
            await page.submit();
            let results = await driver.findElement(page.locators.formResults);
            let text = await results.getText();
            assert(text.includes("radio2"));
        });


        after(async function() {
            driver.quit();
        });
    });
});
