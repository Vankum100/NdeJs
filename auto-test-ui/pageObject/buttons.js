const {Browser, By, Key, until} = require("selenium-webdriver");

const url = 'https://vankum100.github.io/meeting/index.html';

class ButtonsPage {
    constructor(driver) {
        this.driver = driver;
        this.locators = {
            status: By.id('status'),
            saveButton: By.js(function () {
                var buttons = document.getElementsByTagName('button');
                for (index = 0; index < buttons.length; ++index) {
                    if (buttons[index].textContent === "Save") {
                        return buttons[index];
                    }
                }
            }),
        };
    }

    open() {
        this.driver.get(url);
    }

    async clickSave() {
        var button = await this.driver.findElement(this.locators.saveButton);
        await button.click();
    }
}

module.exports = ButtonsPage;
