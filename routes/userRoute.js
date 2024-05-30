const Router = require('koa-router');
const Koa = require('koa');
const koaStatic = require('koa-static');
const upload = require('../middleware/imageUpload');
const { createUser, userLogin } = require('../controllers/userController');
const router = new Router();
const app = new Koa();

app.use(koaStatic('public'));

router.post('/register', upload.single('image'), createUser);
router.post('/login', userLogin);

module.exports = router.routes();
