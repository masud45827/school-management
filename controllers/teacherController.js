const dynamodb = require("../db/db");
const Teacher = require("../model/Teacher");
exports.createTeacher = async (ctx) => {
  const { name, designation, phone } = ctx.req.body;
  console.log(name, designation, phone);
  console.log(ctx.req.file);
  const photo = ctx.req.file.filename;

  try {
    const data = await Teacher.create({ name, designation, phone, photo });
    console.log("teacher added successfully");
    ctx.status = 200;
    ctx.body = { message: "teacher added successfully" };
  } catch (err) {
    console.error("Unable to add teacher", err);
    ctx.status = 500;
    ctx.body = { error: "Unable to add teacher" };
  }
};

exports.byNumber = async (ctx) => {
  try {
    const data = await Teacher.byNumber(ctx.params.id);
    if (!data.Item) {
      console.error("teacher not found");
      ctx.status = 404;
      ctx.body = { error: "teacher not found" };
    } else {
      console.log("teacher retrieved successfully");
      ctx.status = 200;
      ctx.body = data.Item;
    }
  } catch (err) {
    console.error("Unable to read teacher", err);
    ctx.status = 500;
    ctx.body = { error: "Unable to read teacher" };
  }
};

exports.Update = async (ctx) => {
  console.log("update controller13");
  let { name, designation } = ctx.req.body;
  let { phone } = ctx.params;
  const photo = ctx.req.file.filename;
  console.log(name, designation, phone, photo);
  try{
  const data = await Teacher.update({name, designation,phone,photo});
  console.log(data)
  ctx.body = data;
  }catch(error){
    console.log(error)
    ctx.body=error;
  }
};

exports.Delete = async (ctx) => {
  let { phone } = ctx.params;
 
  try {
    const data = await Teacher.Delete({phone});
    ctx.body = "teacher delete successfully";
  } catch (err) {
    ctx.body = "teacher not delete";
  }
};

exports.allTeacher = async (ctx) => {
  try {
    const data = await Teacher.allTeacher();
    ctx.body = data;
  } catch (error) {
    console.error(
      "Unable to scan the table. Error JSON:",
      JSON.stringify(error, null, 2)
    );
    ctx.status = 500;
    ctx.body = { error: "Could not fetch the teachers" };
  }
};
