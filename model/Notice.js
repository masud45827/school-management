const dynamodb = require('../db/db');

const Notice = {
  async create({id,designation,pdf}){
    const params = {
        TableName: 'notice',
        Item: {
            id,
            description,
            pdf
        }
    };

    const data = await dynamodb.put(params).promise();
    return data;

  },

  async get(){
    const params = {
        TableName: 'notice'
    };
   const data = await dynamodb.scan(params).promise();
   return data;
  }
}

module.exports = Notice;