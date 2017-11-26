const FACEBOOK_ACCESS_TOKEN = 'EAAdWsRFWfJEBAP2PCQmTdT3ikZB5DB03XVqGHZChyYyPDZAH75yRWDi4sqH4dW0lrqUhPNHJmrEOEucWz4TAuke4TV0Vb6vWYOkIYaGxnXEmErtwEZBAkdROwDdTrZADMfedJ75q6MP8xJeeuGt0UM7gwnqSJOXoY8YciNREhwQZDZD';
const CAT_IMAGE_URL = 'https://botcube.co/public/blog/apiai-tutorial-bot/hosico_cat.jpg';

const API_AI_TOKEN = '04a0544ad2254f6b91e60b9b6c952154';
const apiAiClient = require('apiai')(API_AI_TOKEN);


const request = require('request');
/*
module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: {
                attachment: {
                    type: 'image',
                    payload: { url: CAT_IMAGE_URL}
                }
            }
        }
    });
};*/

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

        sendTextMessage(senderId, result);
    });

    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};