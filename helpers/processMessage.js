const http = require('http');
const request = require('request');
// Loading tokens

const config = require('../config.js').getConfig();

// Import API.AI and identify with token
const apiai = require('apiai');
const apiAiClient = apiai(config.apiaitoken);
const FACEBOOK_ACCESS_TOKEN = config.facebook.pageAccessToken;


const sendTextMessage = (senderId, text) => {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: { text },
        }
    });
};

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'botcube_co'});

    apiaiSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;
        console.log("this is a response",response.result.parameters);
        sendTextMessage(senderId, result);
            
                      
        
    });

    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};
