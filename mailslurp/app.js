 const MailSlurp = require("mailslurp-client").default;

const mailSlurp = new MailSlurp({
    apiKey: "1ada31de7ca9695add4b5a4f3ca682b55674bc18c50ee0a53f058aadf4090f02"
});

let receiverInbox = {
    type: "Receiver",
    id: "12f19a5c-1ac4-4878-b688-a47b50b5d62b"
};

let senderInbox = {
  type: "Sender",
  id: "3fb1751f-d1c9-4b3b-aaf0-6bc6cc59cdc1"
};

// 
(async () => {
  const options = {
    to: ["12f19a5c-1ac4-4878-b688-a47b50b5d62b@mailslurp.com"],
    subject: "This is LAB TIME",
    body: "This is a mail from my code that we waited for",
  };
  await mailSlurp.sendEmail(senderInbox.id, options);
})();




(async () => {
    console.log("___________________ LIST ALL EMAILS __________________");
  
   
    const emails = await  mailSlurp.getEmails(receiverInbox.id,{minCount:3});
    console.log(emails);
    
    const emailLatest = await mailSlurp.waitForLatestEmail(receiverInbox.id);

    console.log("___________________ LATEST EMAIL INFO __________________");

    console.log("FROM : " + emailLatest.from);
    console.log("SUBJECT : " + emailLatest.subject);
    console.log("BODY : " + emailLatest.body);


    let emailIDs = [];
    emails.forEach(mail => {
        emailIDs.push(mail.id);
    });
  
    console.log("___________________ LIST OF EMAIL IDs__________________");
    console.log(emailIDs);

    const emailId = emailIDs[1];
    const email = await mailSlurp.getEmail(emailId);

    console.log("___________________ TO BE DELETED __________________");

    
    console.log("DELETED Subject: " + email.subject);
  
  
     //delete email
    await mailSlurp.deleteEmail(emailId);

    console.log("___________________ New List of EMAILS __________________");
    
    const finalEmails = await mailSlurp.getEmails(receiverInbox.id, { minCount: 1, limit: 5 });
    
    console.log(finalEmails);
   
    

})();

