const http = require('http');
const request = require('request');
// Loading tokens
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
const config = require('../config.js').getConfig();

// Import API.AI and identify with token
const apiai = require('apiai');
const apiAiClient = apiai(config.apiaitoken);
const FACEBOOK_ACCESS_TOKEN = config.facebook.pageAccessToken;

const orientationProcess = (senderId ) =>{
    request ({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient:{ id:senderId },
            message:{
                attachment:{
                  type:"template",
                  payload:{
                    template_type:"button",
                    text: "que desiriez-vous manger" ,
                    buttons:[
                      {
                        type:"postback",
                        title:"Pizza",
                        payload : "pizza"
                      },
                      {
                        type: "postback",
                        title:"sandwish" ,
                        payload :"sandwish"
                          
                      }
                    ]
                  }
                }
              }
        }
               

    });
};


module.exports = (event ) => {
    const senderId = event.sender.id;
    orientationProcess (senderId);

}