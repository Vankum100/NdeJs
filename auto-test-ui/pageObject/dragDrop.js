const {Browser, By, Key, until} = require("selenium-webdriver");

const url = 'https://crossbrowsertesting.github.io/drag-and-drop.html';

class DragAndDropPage {
    constructor(driver) {
        this.driver = driver;
        this.locators = {
            draggable: By.id('draggable'),
            droppable: By.id('droppable'),
        };
    }

    open() {
        this.driver.get(url);
    }

    async dragDrop() {
        let draggable = this.driver.findElement(this.locators.draggable);
        let droppable = this.driver.findElement(this.locators.droppable);
        await this.driver
            .actions({bridge:true})
            .dragAndDrop(draggable, droppable)
            .perform();
    }
}

module.exports = DragAndDropPage;
