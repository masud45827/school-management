const dynamodb  = require('../db/db');
exports.registerController = async (ctx) => {
  const { name, designation, phone } = ctx.req.body;
  console.log(name, designation, phone);
  console.log(ctx.req.file);
  const photo = ctx.req.file;
 

  const params = {
    TableName: "teacher",
    Item: {
      name,
      phone,
      designation,
      photo,
    },
  };

  try {
    await dynamodb.put(params).promise();
    console.log("teacher added successfully");
    ctx.status = 200;
    ctx.body = { message: "teacher added successfully" };
  } catch (err) {
    console.error("Unable to add teacher", err);
    ctx.status = 500;
    ctx.body = { error: "Unable to add teacher" };
  }
};

exports.getTeacherByNumber = async (ctx) => {
    const params = {
        TableName: 'teacher',
        Key: {
            'phone': ctx.params.id
        }
    };

    try {
        const data = await dynamodb.get(params).promise();
        if (!data.Item) {
            console.error('teacher not found');
            ctx.status = 404;
            ctx.body = { error: 'teacher not found' };
        } else {
            console.log('teacher retrieved successfully');
            ctx.status = 200;
            ctx.body = data.Item;
        }
    } catch (err) {
        console.error('Unable to read teacher', err);
        ctx.status = 500;
        ctx.body = { error: 'Unable to read teacher' };
    }
};
