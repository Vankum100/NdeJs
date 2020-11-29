const {Browser, By, Key, until} = require("selenium-webdriver");
const {suite} = require("selenium-webdriver/testing");
const expect = require('assert');
require('geckodriver');
require('chromedriver');

const Login = require('../pageObject/Login.page.js');

const validUser = {
    email: 'valid@user.com',
    password: 'hunter2'
};
const url = 'https://testyourlog.in/example/';

suite(function(env) {
    describe('Search In Browser', function () {
        this.timeout(30000);
        let driver;

        before(async function() {
            driver = env.builder().build();
            await driver.get(url);
            
        });
        it('should have proper fields', function () {
            expect(login.$email).toExist();
            expect(login.$password).toExist();
            expect(login.$submit).toExist();
        });
    
        it('should let you login with valid credentials', function () {
            login.login(validUser);
    
            // NOTE replace with your own custom assertion here
            expect(login.$submit).not.toExist();
        });
    
        it('should error on a missing email', function () {
            login.login({
                ...validUser,
                email: ''
            });
    
            // NOTE replace with your own custom assertion here
            expect(login.$submit).toExist();
        });
    
        it('should error on a invalid email', function () {
            login.login({
                ...validUser,
                email: 'gobbledegook'
            });
    
            // NOTE replace with your own custom assertion here
            expect(login.$submit).toExist();
        });
    
        it('should error on missing password', function () {
            login.login({
                ...validUser,
                password: ''
            });
    
            // NOTE replace with your own custom assertion here
            expect(login.$submit).toExist();
        });

        after(async function() {
            driver.quit();
        });
    });
});