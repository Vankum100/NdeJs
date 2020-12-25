<?php

use PHPUnit\Framework\TestCase;


final class EmailTest extends TestCase
{
    private function getConfig()
    {
       
        return MailSlurp\Configuration::getDefaultConfiguration()
            ->setApiKey('x-api-key',  '074a632d61ca3449410d05b1303766e8d45eeac755177fbe13c9bd19b760a7cd');
    }

    public function test_CanCreateAnInbox_ThenSendAndReceiveEmails()
    {
        // create an inbox controller
        $inboxController = new MailSlurp\Apis\InboxControllerApi(null, $this->getConfig());

        // create an inbox
        $inbox = $inboxController->createInbox();

        // verify inbox has an email address ending in @mailslurp.com
        $this->assertStringContainsString(
            "mailslurp.com",
            $inbox->getEmailAddress()
        );
    }

    public function test_CanSendAndReceiveEmail_BetweenTwoInboxes()
    {
        // create inbox and waitFor controllers
        $inbox_controller = new MailSlurp\Apis\InboxControllerApi(null, $this->getConfig());
        $wait_for_controller = new MailSlurp\Apis\WaitForControllerApi(null, $this->getConfig());

        // create two inboxes
        $inbox_1 = $inbox_controller->createInbox();
        $inbox_2 = $inbox_controller->createInbox();

        // send a confirmation code from inbox1 to inbox2 (sends an actual email)
        $send_options = new MailSlurp\Models\SendEmailOptions();
        $send_options->setTo([$inbox_2->getEmailAddress()]);
        $send_options->setSubject("Test");
        $send_options->setBody("Confirmation code = abc123");
        $inbox_controller->sendEmail($inbox_1->getId(), $send_options);

        // receive email for inbox2
        $timeout_ms = 30000;
        $unread_only = true;
        $email = $wait_for_controller->waitForLatestEmail($inbox_2->getId(), $timeout_ms, $unread_only);

        // verify emails content
        $this->assertEquals($inbox_1->getEmailAddress(), $email->getFrom());
        $this->assertEquals($inbox_2->getEmailAddress(), $email->getTo()[0]);
        $this->assertEquals("Test", $email->getSubject());
        $this->assertStringContainsString("Confirmation code = ", $email->getBody());

        // extract part of an email using regex (could be used in further test steps)
        $matches = array();
        preg_match('/.+code = (.+)/', $email->getBody(), $matches);
        $confirmation_code = $matches[1];
        $this->assertEquals($confirmation_code, "abc123");
    }


    public function test_canListInboxes(): void
    {
        // create an inbox controller with config
        $inboxController = new MailSlurp\Apis\InboxControllerApi(null, $this->getConfig());

        $pageInboxes = $inboxController->getAllInboxes($favourite = null, $page = 0, $size = 20);

        // assert pagination properties
        $this->assertEquals(0, $pageInboxes->getNumber());
        $this->assertEquals(20, $pageInboxes->getSize());
        $this->assertGreaterThan(0, $pageInboxes->getTotalElements());

        // access inboxes via content
        foreach ($pageInboxes->getContent() as $inbox) {
            $this->assertNotNull($inbox->getId());
        }
    }





}