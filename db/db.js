
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1', 
    endpoint: 'http://localhost:8000' 
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports = dynamodb;