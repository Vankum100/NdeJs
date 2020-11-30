const {Browser, By, Key, until} = require("selenium-webdriver");
const {suite} = require("selenium-webdriver/testing");
const assert = require('assert');
require('geckodriver');
require('chromedriver');


const url = 'https://www.google.com/';

suite(function(env) {
    describe('Search In Browser', function () {
        this.timeout(45000);
        let driver;

        before(async function() {
            driver = env.builder().build();
            await driver.get(url);
            
        });
        
        it('Has Result Page', async function() {
              
            let searchField = await driver.findElement(By.name('q'));

            await searchField.sendKeys('Selenium');
            await searchField.sendKeys(Key.ENTER);
            // await driver.wait(until.titleIs('selenium - Поиск в Google'), 9000);
            // await driver.wait(until.titleIs('selenium - Google Search'), 9000);
            
            await driver.manage().setTimeouts({implicit: 7000});
            let list = await driver.findElements(By.className('g'));

             assert(list.length > 0);
            
        });

        after(async function() {
            driver.quit();
        });
    });
});