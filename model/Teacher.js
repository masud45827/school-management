const dynamodb  = require('../db/db');

const Teacher = {
    async create({name, designation, phone,photo}){
        const params = {
            TableName: "teacher",
            Item: {
              name,
              phone,
              designation,
              photo,
            },
          };
          const data = await dynamodb.put(params).promise();
          return data;
            

    },
    
    async allTeacher(){
        const params = {
            TableName: "teacher"
        };
      const data = await dynamodb.scan(params).promise(); 
      return data;
    },

    async byNumber(){
        const params = {
            TableName: "teacher",
            Key: {
              phone: ctx.params.id,
            },
          };
         const data = await dynamodb.get(params).promise(); 
         return data;
    },

    async update({name, designation,phone,photo}){
        const params = {
            TableName: "teacher",
            Key: {
              phone,
            },
            UpdateExpression:
              "SET #name = :name, #designation = :designation, #photo = :photo",
            ExpressionAttributeNames: {
              "#name": "name",
              "#designation": "designation",
              "#photo": "photo",
            },
            ExpressionAttributeValues: {
              ":name": name,
              ":designation": designation,
              ":photo": photo,
            },
            ReturnValues: "UPDATED_NEW",
          };
          const data = await dynamodb.update(params).promise();
          return data;

    },

    async Delete({phone}){
        const params = {
            TableName: "teacher",
            Key: {
              phone,
            },
          };
         const data = await dynamodb.delete(params).promise();
         return data;
    }
}

module.exports = Teacher;