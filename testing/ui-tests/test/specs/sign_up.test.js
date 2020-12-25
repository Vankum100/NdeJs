const assert = require('assert');
const MailSlurp = require('mailslurp-client').default;
const apiKey =
  '074a632d61ca3449410d05b1303766e8d45eeac755177fbe13c9bd19b760a7cd';
const mailslurp = new MailSlurp({ apiKey });

describe('sign up, confirm, login and reset', () => {
  let inbox;
  let password = 'test-password';
  let code;

  it('can load playground app', async () => {
    await browser.url('/');
    await browser.setWindowSize(1200, 1200);
  });

  it('can load the sign-up section', async () => {
    // find the create account link and click it
    await $('[data-test="sign-in-create-account-link"]').then((e) => e.click());
    await $('[data-test="sign-up-header-section"]')
      .then((e) => e.getText())
      .then((text) => assert.strictEqual(text, 'Testable Sign Up Form'));
  });

  it('can sign-up with new user', async () => {
    // create a new email address for the test run
    inbox = await mailslurp.createInbox();

    // fill out and submit the new user form
    await $('[name="email"]').then((e) => e.setValue(inbox.emailAddress));
    await $('[name="password"]').then((e) => e.setValue(password));
    await $('[data-test="sign-up-create-account-button"]').then((e) =>
      e.click(),
    );
  });

  it('can fetch confirmation code', async () => {
    // fetch the email from mailslurp
    const email = await mailslurp.waitForLatestEmail(inbox.id);

    // verify that it contains the code
    assert.strictEqual(/verification code is/.test(email.body), true);

    // extract the confirmation code
    code = /([0-9]{6})$/.exec(email.body)[1];
  });

  it('can enter confirmation code and confirm user', async () => {
    await $('[name="code"]').then((e) => e.setValue(code));
    await $('[data-test="confirm-sign-up-confirm-button"]').then((e) =>
      e.click(),
    );
  });

  it('can log in with confirmed account', async () => {
    // assert we see the sign in form
    await $('[data-test="sign-in-header-section"]')
      .then((e) => e.getText())
      .then((text) => assert.strictEqual(text, 'Sign in to your account'));

    // fill out username (email) and password
    await $('[name="username"]').then((e) => e.setValue(inbox.emailAddress));
    await $('[name="password"]').then((e) => e.setValue(password));

    // submit
    await $('[data-test="sign-in-sign-in-button"]').then((e) => e.click());
  });

  it('shows the successful greeting', async () => {
    await $('[data-test="greetings-nav-bar"]')
      .then((e) => e.getText())
      .then((text) => assert.strictEqual(/Hello/.test(text), true));
  });
});
