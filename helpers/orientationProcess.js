const http = require('http');
const request = require('request');
// Loading tokens

const config = require('../config.js').getConfig();

// Import API.AI and identify with token
const apiai = require('apiai');
const apiAiClient = apiai(config.apiaitoken);
const FACEBOOK_ACCESS_TOKEN = config.facebook.pageAccessToken;



const orientationProcess = (senderId , name ) =>{
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
                    text: "Bonjour " +name +" . Bienvenue chez MonResto, je suis à votre service :D" ,
                    buttons:[
                      {
                        type:"postback",
                        title:"Besoin d'information ",
                        payload : "aide"
                      },
                      {
                        type: "postback",
                        title:"Passer une commande" ,
                        payload :"commande"
                          
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
    var usersPublicProfile = "https://graph.facebook.com/v2.6/" + senderId + "?fields=first_name,last_name,profile_pic&access_token=" + FACEBOOK_ACCESS_TOKEN ;    
    request({
      url: usersPublicProfile,
      json: true 
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        orientationProcess (senderId , body.first_name );
      }
  });


}