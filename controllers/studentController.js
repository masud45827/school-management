const { Types } = require("aws-sdk/clients/acm");
const dynamodb = require("../db/db");
const Student = require("../model/Student");
exports.createStudent = async (ctx) => {
  let { Class, id, name, fatherName, motherName, address, phone } =
    ctx.req.body;
  const photo = ctx.req.file.filename;

  if (typeof Class === "string") {
    Class = parseInt(Class, 10);
  }

  if (typeof id === "string") {
    id = parseInt(id, 10);
  }

  try {
    await Student.create({
      Class,
      id,
      name,
      fatherName,
      motherName,
      address,
      phone,
      photo,
    });
    console.log("Student added successfully");
    ctx.status = 200;
    ctx.body = { message: "Student added successfully" };
  } catch (err) {
    console.error("Unable to add student", err);
    ctx.status = 500;
    ctx.body = { error: "Unable to add student" };
  }
};

exports.byClassAndId = async (ctx) => {
  let { Class, id } = ctx.params;
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
  console.log(Class, id);
  try {
    const data = await Student.byClassAndId({ Class, id });
    console.log(data);
    if (!data.Item) {
      ctx.status = 404;
      ctx.body = { error: "Student not found" };
      return;
    }
    ctx.status = 200;
    ctx.body = data.Item;
  } catch (err) {
    console.error("Error retrieving student", err);
    ctx.status = 500;
    ctx.body = { error: "Unable to retrieve student" };
  }
};

exports.allStudent = async (ctx) => {
  try {
    const data = await Student.allStudent();
    console.log(data);
    console.log(data.Items);
    ctx.body = data.Items;
  } catch (error) {
    ctx.body = error;
  }
};

exports.byClass = async (ctx) => {
  let { Class } = ctx.params;
  console.log("browser", Class);
  if (typeof Class === "string") {
    Class = parseInt(Class, 10);
  }

  try {
    const data = await Student.byClass({ Class });
    console.log(data);
    ctx.body = data.Items;
  } catch (err) {
    console.error("Unable to query users by class", err);
    throw err;
  }
};

exports.update = async (ctx) => {
  console.log("update controller");
  let { name, fatherName, motherName, address, phone } = ctx.req.body;
  let { Class, id } = ctx.params;
  const photo = ctx.req.file.filename;
  console.log(Class, id, name, fatherName, motherName, address, phone);
  if (typeof Class === "string") {
    Class = parseInt(Class, 10);
  }

  if (typeof id === "string") {
    id = parseInt(id, 10);
  }

  try {
    const data = await Student.update({
      name,
      fatherName,
      motherName,
      address,
      phone,
      Class,
      id,
      photo,
    });
    ctx.body = data.Items;
  } catch (error) {
    ctx.body = error;
  }
};

exports.Delete = async (ctx) => {
  let { Class, id } = ctx.params;
  if (typeof Class === "string") {
    Class = parseInt(Class, 10);
  }

  if (typeof id === "string") {
    id = parseInt(id, 10);
  }

  console.log(Class, id);
  try {
    await Student.delete({ Class, id });
    ctx.body = "student delete successfully";
  } catch (err) {
    ctx.body = "student not delete";
  }
};
