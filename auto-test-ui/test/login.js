const assert = require('assert');
// Include the chrome driver or firefox

require('chromedriver');

//require("geckodriver");

// Include selenium webdriver
let swd = require('selenium-webdriver');
let browser = new swd.Builder();

let tab = browser.forBrowser('chrome').build();

//let tab = browser.forBrowser("firefox").build();

// Get the credentials from the JSON file
let { email, pass } = require('../credentials.json');

// Step 1 - Opening the geeksforgeeks sign in page
let tabToOpen = tab.get('https://auth.geeksforgeeks.org/');
tabToOpen
  .then(function () {
    // Timeout to wait if connection is slow
    let findTimeOutP = tab.manage().setTimeouts({
      implicit: 10000, // 10 seconds
    });
    return findTimeOutP;
  })
  .then(function () {
    // Step 2 - Finding the username input
    let promiseUsernameBox = tab.findElement(swd.By.css('#luser'));
    return promiseUsernameBox;
  })
  .then(function (usernameBox) {
    // Step 3 - Entering the username
    let promiseFillUsername = usernameBox.sendKeys(email);
    assert.strictEqual(promiseFillUsername, email);
    return promiseFillUsername;
  })
  .then(function () {
    // Step 4 - Finding the password input
    let promisePasswordBox = tab.findElement(swd.By.css('#password'));
    return promisePasswordBox;
  })
  .then(function (passwordBox) {
    // Step 5 - Entering the password
    let promiseFillPassword = passwordBox.sendKeys(pass);
    assert.strictEqual(promiseFillPassword, pass);
    return promiseFillPassword;
  })
  .then(function () {
    // Step 6 - Finding the Sign In button
    let promiseSignInBtn = tab.findElement(
      swd.By.css('.btn.btn-green.signin-button'),
    );
    return promiseSignInBtn;
  })
  .then(function (signInBtn) {
    // Step 7 - Clicking the Sign In button
    let promiseClickSignIn = signInBtn.click();
    return promiseClickSignIn;
  })
  .then(function () {
    assert.ok(true);
    //tab.quit();
  })
  .catch(function (err) {
    console.log('Error ', err, ' occurred!');
  });
