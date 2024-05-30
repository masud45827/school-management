const dynamodb = require("../db/db");

const User ={
  async create({username,name,password,phone,photo}){
    const params = {
        TableName: "user",
        Item: {
          username,
          name,
          password,
          phone,
          photo,
        },
      };
      const response =await dynamodb.put(params).promise();
      return response;
  },

  async login({username}){

    const params = {
        TableName: "user",
        Key: {
          username: username,
        },
      };

      const data = await dynamodb.get(params).promise();
      return data;

  }
}

module.exports =User;