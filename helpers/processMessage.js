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
        console.log("this is a response",response);
        sendTextMessage(senderId, result);
            
                      
        
    });

    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};
function callWeatherApi (city, date) {
    return new Promise((resolve, reject) => {
      // Create the path for the HTTP request to get the weather
      let path = 'api.openweathermap.org/data/2.5/weather?q=' + city //'/premium/v1/weather.ashx?format=json&num_of_days=1' +
       // '&q=' + encodeURIComponent(city) + '&key=' + wwoApiKey + '&date=' + date;
      console.log('API Request: ' + host + path);
      // Make the HTTP request to get the weather
      http.get({host: host, path: path}, (res) => {
        let body = ''; // var to store the response chunks
        res.on('data', (d) => { body += d; }); // store each response chunk
       res.on('end', () => {
          // After all the data has been received parse the JSON for desired data
          let response = JSON.parse(body);
          let forecast = response['data']['weather'][0];
          let location = response['data']['request'][0];
          let conditions = response['data']['current_condition'][0];
          let currentConditions = conditions['weatherDesc'][0]['value'];
          // Create response
          let output = `Current conditions in the ${location['type']} 
          ${location['query']} are ${currentConditions} with a projected high of
          ${forecast['maxtempC']}°C or ${forecast['maxtempF']}°F and a low of 
          ${forecast['mintempC']}°C or ${forecast['mintempF']}°F on 
          ${forecast['date']}.`;
          // Resolve the promise with the output text
          console.log(output);
          resolve(output);
        });
        res.on('error', (error) => {
          reject(error);
        });

      });
    });
  }