const imaps = require('imap-simple');
const simpleParser = require('mailparser').simpleParser;
const _ = require('lodash');
const config = {
    imap: {
        user: 'springtimedevelopers@gmail.com',
        password: '2020Spring2020',
        host: 'imap.gmail.com',
        port: 993,
        tls:{
            rejectUnauthorized:false
          },
        authTimeout: 3000
    }
};
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
imaps.connect(config).then(async function (connection) {
    await connection.openBox('INBOX');
    var searchCriteria = ['RECENT'];
    var fetchOptions = {
        bodies: ['HEADER', 'TEXT', ''],
    };
    const messages = await connection.search(searchCriteria, fetchOptions);
    messages.forEach(function (item) {
        var all = _.find(item.parts, { "which": "" });
        var id = item.attributes.uid;
        var idHeader = "Imap-Id: " + id + "\r\n";
        //console.log(idHeader);
        simpleParser(idHeader + all.body, (err, mail) => {
            // access to the whole mail object
            
            
            let from = mail.from.text.toString();

            let bolEmail = from.includes('ivankumovich@gmail.com');
            if (bolEmail) {
                console.log(id);
                console.log("subject: " + mail.subject);
                console.log(from);
                
                 console.log('to : ' + mail.to.text);
            }
            console.log(bolEmail);

            //console.log('msg : ' + mail.text);
        });
    });
}).catch( e => { console.error(e);});


let allmsgs = imaps.connect(config).then(async connection => {

    await connection.openBox('INBOX');
    const messages = await connection.search(['ALL'], { bodies: ['HEADER'] });
    //const parts = messages.parts;
    //let [parts] = messages;
   // console.log(messages.length);
    //console.log(messages[368].parts[0]);
    //console.log(messages[368].parts[0].body.subject[0]);
    //console.log(messages[368].parts[0].body.from[0]);
    
    // select messages from bob
    /*const uidsToDelete = messages
        .filter(message => {
            return message.parts
                .filter(part => part.which === 'HEADER')[0].body.to[0] === 'kumkarana04@gmail.com';
        })
        .map(message_1 => message_1.attributes.uid);
    return connection.deleteMessage(uidsToDelete); */
}).catch( e => { console.error(e);});