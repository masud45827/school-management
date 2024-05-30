const Koa = require('koa')
const Router = require('koa-router');
const koBody  = require('koa-body')
const bodyParser = require('koa-bodyparser')
const path = require('path')
const userRoute = require('./routes/userRoute');
const studentRoute = require('./routes/studentRoutes');
const cors = require('@koa/cors');
const teacherRoute = require('./routes/teacherRoutes');
const noticeRoute = require('./routes/noticeRoutes');
const resultRoute = require('./routes/resultRoute');



const json = require('koa-json');
const app = new Koa();
const router = new Router();

app.use(cors());
app.use(json());
app.use(bodyParser());
router.use('/teachers',teacherRoute);
router.use('/user',userRoute);
router.use('/students',studentRoute);
router.use('/notices',noticeRoute); 
router.use('/result',resultRoute);


app.use(router.routes());
app.use(router.allowedMethods());

const main = async()=>{
  const PORT = 3000;
  app.listen(PORT,()=>{
     console.log(`listening port ${PORT}`);
  })
}

main();






// const Koa = require('koa')
// const Router = require('koa-router');
// const koBody  = require('koa-body')
// const path = require('path')
// const userRoute = require('./routes/userRoutes');
// const studentRoute = require('./routes/studentRoutes');
// const teacherRoute = require('./routes/teacherRoutes');
// const noticeRoute = require('./routes/noticeRoutes');
// const json = require('koa-json');
// const multer = require('koa-multer');

// const app = new Koa();
// const router = new Router();


// const storage = multer.diskStorage({
//    destination: (req, file, cb) => {
//        cb(null, path.join(__dirname, './public/image'));
//    },
//    filename: (req, file, cb) => {
//        const name = Date.now() + '-' + file.originalname;
//        cb(null, name);
//    }
// });

// const upload = multer({ storage: storage });

// const dynamodb  = require('./db/db');
// app.use(json());

// router.get('/',(ctx)=>{
//    ctx.body='successful';
// })

// // router.get('/students/:id', async (ctx) => {
// //    console.log('yes comming')
// //    const params = {
// //        TableName: 'student',
// //        Key: {
// //            'StudentID': ctx.params.id
// //        }
// //    };

// //    try {
// //        const data = await dynamodb.get(params).promise();
// //        if (!data.Item) {
// //            console.error('Student not found');
// //            ctx.status = 404;
// //            ctx.body = { error: 'Student not found' };
// //        } else {
// //            console.log('Student retrieved successfully');
// //            ctx.status = 200;
// //            ctx.body = data.Item;
// //        }
// //    } catch (err) {
// //        console.error('Unable to read student', err);
// //        ctx.status = 500;
// //        ctx.body = { error: 'Unable to read student' };
// //    }
// // });


// router.post('/upload',upload.single('image'),(ctx)=>{
//    console.log('come')
//    console.log(ctx.request);
//    console.log(ctx.req.body);
//    console.log(ctx.req.file);
 
// })
// // router.post('/teachers/register',,(ctx)=>{
// //     const { name, designation, phone, photo } = ctx.request.body;
// //         console.log(ctx.req.data);
// // });

// router.use('/teachers',teacherRoute);
// // router.use('/students',studentRoute);
// // router.use('/notices',noticeRoute);


// app.use(router.routes());
// app.use(router.allowedMethods());



// const main = async()=>{
//   const PORT = 3000;
//   app.listen(PORT,()=>{
//      console.log(`listening port ${PORT}`);
//   })
// }

// main();
