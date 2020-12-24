require('dotenv').config();
const { expect } = require('chai');
const MailSlurp = require('./mail_helper');

let Account;

describe('Email Test Suite', function () {
  this.timeout(20000);

  before(() => {
    Account = new MailSlurp({ apiKey: process.env.API_KEY });
  });

  beforeEach(async () => Account._before());
  afterEach(async () => Account._after());

  it('should create an inbox', async () => {
    const mailbox = await Account.haveNewMailbox();
    expect(mailbox.id).to.be.a('string');
    expect(mailbox.emailAddress).to.be.a('string');
    expect(mailbox.emailAddress).to.contain('@');
    expect(mailbox.toString()).to.eql(mailbox.emailAddress);
  });

  it('should send and receive an email', async () => {
    const mailbox = await Account.haveNewMailbox();
    await Account.sendEmail({
      to: [mailbox.emailAddress],
      subject: 'Hello Test',
      body: 'Testing',
    });
    const email = await Account.waitForLatestEmail(50);
    expect(email.body.trim()).to.eql('Testing');
    await Account.seeInEmailSubject('Hello');
    await Account.seeEmailSubjectEquals('Hello Test');
    await Account.seeEmailIsFrom(mailbox.emailAddress);
    await Account.seeInEmailBody('Testing');
    await Account.dontSeeInEmailBody('Email');
    await Account.dontSeeInEmailSubject('Bye');
  });

  it('should send an email', async () => {
    const mailbox = await Account.haveNewMailbox();
    await Account.sendEmail({
      to: [mailbox.emailAddress],
      subject: 'Send Testing',
      body: 'Sending Email',
    });

    const email = await Account.waitForEmailMatching({
      subject: 'Send Testing',
    });
    expect(email.body.trim()).to.eql('Sending Email');
    await Account.seeInEmailSubject('Send');
    await Account.seeEmailSubjectEquals('Send Testing');
  });
});
