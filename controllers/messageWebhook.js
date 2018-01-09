const processMessage = require('../helpers/processMessage');
const processPostback = require('../helpers/processPostback');
const config = require('../config.js').getConfig();
const fs = require('fs');
const http = require('http');
const request = require('request');


// Import API.AI and identify with token
const FACEBOOK_ACCESS_TOKEN = config.facebook.pageAccessToken;


module.exports = (req, res) => {
    if (req.body.object === 'page') {
        req.body.entry.forEach(entry => {
            entry.messaging.forEach(event => {       
                if ( typeof event.postback === 'undefined' ){    
                        processMessage(event);
                    
                }else {
                    processPostback(event);
                }
                
            });}
        );
        res.status(200).end();
    }
};
