const {Browser, By, Key, until} = require("selenium-webdriver");

const url = "https://vankum100.github.io/meeting/index.html";


// const localhost = "http://localhost/server/app/index.html";

// Define a class to represent the page.
// Instances of this class will be responsible for controlling WebDriver to do operations on the page.
class RsvpPage {
    // The class constructor sets up new instances of the class.
    // We're going to have the test pass in a browser driver object when creating a page object.
    // The page object will call methods on the driver object to control the page.
    constructor(driver) {
        // We'll set the "driver" property of the new object to equal the driver that's passed in.
        this.driver = driver;
        // The locators property will be an object containing locators for the different page
        // elements we need to find.
        this.locators = {
            // Our first test uses this locator to find the list that we'll populate with invitees.
            // We'll move the locator from the test to here.
            invitedList: By.id('invitedList'),
            // Our second tests uses this locator to find the form to register invitees.
            // We'll move that here, too.
            registrationForm: By.id('registrar'),
            invitees: By.css('#invitedList li')
        };
    }
    // This method will load the page. It will use whatever driver object we pass into the constructor.
    open() {
        this.driver.get(url);
    }
}

// We need to set the values that will be returned when this module is required from another module.
// We'll set it up to return the RsvpPage class.
module.exports = RsvpPage;