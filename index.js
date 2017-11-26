const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000, () => console.log('Webhook server is listening, port 5000'));
const verificationController = require('./controllers/verification.js');
const messageWebhookController = require('./controllers/messageWebhook.js');

app.get('/', verificationController);
app.post('/', messageWebhookController);