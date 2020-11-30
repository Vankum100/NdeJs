const {Browser, By, Key, until} = require("selenium-webdriver");
const {suite} = require("selenium-webdriver/testing");
const assert = require('assert');

require('geckodriver');
require('chromedriver');


const DragAndDropPage = require('../pageObject/dragDrop.js');


suite(function(env) {
    describe('Drag and drop demo', function () {
        this.timeout(45000);
        let driver;
        let page;

        before(async function() {
            driver = env.builder().build();
            page = new DragAndDropPage(driver);
            page.open();
        });

        it('Updates Droped status text', async function() {
            await page.dragDrop();
            let droppable = await driver.findElement(page.locators.droppable);
            var text = await droppable.getText();
            assert(text.includes("Dropped"));
        });

        after(async function() {
            driver.quit();
        });
    });
});
