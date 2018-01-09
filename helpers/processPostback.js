const orientationProcess = require ('./orientationProcess');
const processMessage= require ('./processMessage');
const sendMenu = require('./sendMenu');
const sendMessage = require('./sendMessage');
const config = require('../config.js').getConfig();
const fs = require('fs');
const http = require('http');
const request = require('request');


// Import API.AI and identify with token
const FACEBOOK_ACCESS_TOKEN = config.facebook.pageAccessToken;


module.exports = (event) => { 
                console.log(event.postback.payload);            
                if ( event.postback.payload=='USER_DEFINED_PAYLOAD'){
                    orientationProcess(event) ;
                } else if (event.postback.payload =='commande'){
                    sendMenu(event);
                }else if (event.postback.payload =='aide'){
                    const message = "Comment puis-je vous aider ? ;) ";
                    sendMessage(event , message);
                }else { console.log(event) ;}
                
        
       
     
    
};
