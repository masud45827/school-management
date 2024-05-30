const dynamodb = require("../db/db");

const Student = {
  async create({
    Class,
    id,
    name,
    fatherName,
    motherName,
    address,
    phone,
    photo,
  }) {
    const params = {
      TableName: "student",
      Item: {
        Class,
        id,
        name,
        fatherName,
        motherName,
        address,
        phone,
        photo,
      },
    };

    const response = await dynamodb.put(params).promise();
    return response;
  },

  async byClass({ Class }) {
    const params = {
      TableName: "student",
      KeyConditionExpression: "#Class = :Class",
      ExpressionAttributeNames: {
        "#Class": "Class",
      },
      ExpressionAttributeValues: {
        ":Class": Class,
      },
    };

    // let { Class,id } = ctx.params;
    // console.log('comming')

    // if (typeof Class === "string") {
    //   Class = parseInt(Class, 10);
    // }
    // if (typeof id === "string") {
    //   id = parseInt(id, 10);
    // }

    // const params = {
    //   TableName: "student",
    //   KeyConditionExpression: '#Class = :Class and #id = :id',
    //   ExpressionAttributeNames: {
    //     '#Class': 'Class',
    //     '#id' : 'id'
    //   },
    //   ExpressionAttributeValues: {
    //     ':Class': Class,
    //     ':id': id
    //   },
    // };

    const data = await dynamodb.query(params).promise();
    return data;
  },

  async byClassAndId({Class,id}){
  if (typeof Class === "string") {
    Class = parseInt(Class, 10);
  }

  if (typeof id === "string") {
    id = parseInt(id, 10);
  }

  const params = {
    TableName: "student",
    Key: {
      Class,
      id,
    },
  };

    const data = await dynamodb.get(params).promise();
    return data;
  },
  async allStudent(){
    const params = {
      TableName: "student",
    };
    const data = await dynamodb.scan(params).promise();
    return data;

  },
  async update({name, fatherName, motherName, address, phone,Class, id,photo}){
    const params = {
      TableName: "student",
      Key: {
        Class: Class,
        id: id,
      },
      UpdateExpression:
        "SET #name = :name, #fatherName = :fatherName, #motherName = :motherName, #address = :address, #phone = :phone, #photo=:photo",
      ExpressionAttributeNames: {
        "#name": "name",
        "#fatherName": "fatherName",
        "#motherName": "motherName",
        "#address": "address",
        "#phone": "phone",
        "#photo": "photo",
      },
      ExpressionAttributeValues: {
        ":name": name,
        ":fatherName": fatherName,
        ":motherName": motherName,
        ":address": address,
        ":phone": phone,
        ":photo": photo,
      },
      ReturnValues: "UPDATED_NEW",
    };
    const data = await dynamodb.update(params).promise();
    return data;
  },
  async delete({Class,id}){
    const params = {
      TableName: "student",
      Key: {
        Class,
        id,
      },
    };
    await dynamodb.delete(params).promise();
  }
};

module.exports = Student;
