const {Browser, By, Key, until} = require("selenium-webdriver");
const {suite} = require("selenium-webdriver/testing");
const assert = require('assert');
require('geckodriver');
require('chromedriver');

const RsvpPage = require('../pageObject/rsvp.js');

const ButtonsPage = require('../pageObject/buttons.js');



suite(function(env) {
    describe('RSVP site', async function () {
        this.timeout(25000);
        let driver;
        // Define a variable to hold the page object here so that it stays in scope
        // for all our tests as well.
        let page;

        before(async function() {
            driver = env.builder().build();
            // Create a new page object that will use our driver object.
            // Store it in the page variable.
            page = new RsvpPage(driver);
            // Instead of calling driver.get() ourselves, we'll let the page object
            // load the page for us.
            page.open();
        });

        it('has invitee list', async function() {
            // Use the locator from the page object instead.
            let elements = await driver.findElements(page.locators.invitedList);
            assert(elements.length > 0);
        });

        it('has registration form', async function() {
            // Use the locator from the page object instead.
            let elements = await driver.findElements(page.locators.registrationForm);
            assert(elements.length > 0);
        });

        it('loads existing invitations', async function() {
            
            let list = await driver.findElement(page.locators.invitedList);
            
            await driver.wait(
                until.elementLocated(page.locators.invitees)
            );
            
            let text = await list.getText();
            // We end our test by asserting that the text includes the name.
            assert(text.includes("Craig Dennis"));
        });

        after(async function() {
            driver.quit();
        });
    });
});


suite(function(env) {
    describe('Save button', function () {
        this.timeout(25000);
        let driver;
        let page;

        before(async function() {
            driver = env.builder().build();
            page = new ButtonsPage(driver);
            page.open();
        });

        it('Updates status text', async function() {
            await page.clickSave();
            let span = await driver.findElement(page.locators.status);
            let text = await span.getText();
            assert(text.includes("Saved!"));
        });

        after(async function() {
            driver.quit();
        });
    });
});
