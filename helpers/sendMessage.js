const http = require('http');
const request = require('request');
// Loading tokens

const config = require('../config.js').getConfig();

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

module.exports = (event, message ) => {
    const senderId = event.sender.id;

        sendTextMessage(senderId, message);
            
                      
        


};
