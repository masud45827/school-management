const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.createUser = async (ctx) => {
  let { username, name, password, phone, secret_key } = ctx.req.body;
  password = await bcrypt.hash(password, 10);
  console.log(name, username, phone, password, secret_key);
  console.log(ctx.req.file);
  if (secret_key !== "school") {
    ctx.body = "secret key does not match";
    return;
  }
  console.log(ctx.req.file);
  const photo = ctx.req.file.filename;
  try {
    const response = await User.create({
      username,
      name,
      password,
      phone,
      photo,
    });
    console.log("admin added successfully");
    ctx.status = 200;
    ctx.body = { message: "admin added successfully" };
  } catch (err) {
    console.error("Unable to add admin", err);
    ctx.status = 500;
    ctx.body = { error: "Unable to add admin" };
  }
};


exports.userLogin = async (ctx) => {
  const { username, password } = ctx.request.body;
  console.log(username, password);
  try {
    const data = await User.login({username});
    if (!data.Item) {
      ctx.body = "User not found";
      return;
    }

    const hashedPassword = data.Item.password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordMatch) {
      const token = jwt.sign(
        {
          username: username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      ctx.status = 200;
      ctx.body = token;
    } else {
      ctx.body = "Login unsuccessful";
    }
  } catch (err) {
    console.error("Error during login:", err);
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
  }
};

