const processMessage = require('../helpers/processMessage');
const config = require('../config.js').getConfig();
const fs = require('fs');
const http = require('http');
const request = require('request');


// Import API.AI and identify with token
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


module.exports = (req, res) => {
    if (req.body.object === 'page') {
        req.body.entry.forEach(entry => {
            entry.messaging.forEach(event => {  
                if ( typeof event.postback === 'undefined'){    
                    if (event.message && event.message.text) {
                        processMessage(event);
                    }
                }else{
                    const senderId = event.sender.id;
                    sendTextMessage(senderId ,'hi there');
                } 
                
            });}
        );
        res.status(200).end();
    }
};
