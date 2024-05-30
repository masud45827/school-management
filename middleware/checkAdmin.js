const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
exports.verifyToken = async (ctx, next) => {
    console.log('yes comming')
    const token = ctx.request.headers.authorization;
    if (!token) {
      ctx.status = 401; 
      ctx.body = { error: 'No token provided' };
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      await next();
    } catch (error) {
      ctx.status = 401; 
      ctx.body = { error: 'Invalid token' };
    }
  };
