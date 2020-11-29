const {Browser, By, Key, until} = require("selenium-webdriver");
const { Builder } = require("selenium-webdriver");
const assert = require('assert');
//require('geckodriver');
require('chromedriver');

(async function search() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://www.google.com/');
        let searchField = await driver.findElement(By.name('q'));

        await searchField.sendKeys('Selenium');
        await searchField.sendKeys(Key.ENTER);
       // await driver.wait(until.titleIs('selenium - Поиск в Google'), 9000);
       // await driver.wait(until.titleIs('selenium - Google Search'), 9000);
        
         await driver.manage().setTimeouts({implicit: 7000});
        let list = await driver.findElements(By.className('g'));

        assert(list.length > 0);
           
        
    } catch (e) {
        console.error(e);
    } 
    finally {
        await driver.quit();
    }
})();