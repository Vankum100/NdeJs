// cypress/support/commands.js
const { MailSlurp } = require('mailslurp-client');

const apiKey =
  '074a632d61ca3449410d05b1303766e8d45eeac755177fbe13c9bd19b760a7cd';
// or Cypress.env("API_KEY")
const mailslurp = new MailSlurp({ apiKey });

Cypress.Commands.add('createInbox', () => {
  // instantiate MailSlurp
  const mailslurp = new MailSlurp({ apiKey: Cypress.env('API_KEY') });
  // return { id, emailAddress } or a new randomly generated inbox
  return mailslurp.createInbox();
});

Cypress.Commands.add('waitForLatestEmail', (inboxId) => {
  return mailslurp.waitForLatestEmail(inboxId);
});
