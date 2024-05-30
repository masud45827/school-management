const Router = require('koa-router');
const Koa = require('koa');
const koaStatic = require('koa-static');
const {createTeacher,byNumber, Update, Delete, allTeacher} = require('../controllers/teacherController');
const upload = require('../middleware/imageUpload');
const { verifyToken } = require('../middleware/checkAdmin');
const router = new Router();
const app = new Koa();

app.use(koaStatic('public'));

router.post('/',verifyToken, upload.single('image'), createTeacher);
router.get('/', allTeacher);
router.get('/:id', byNumber);
router.put('/:phone',verifyToken,upload.single('image'),Update);
router.delete('/:phone',verifyToken,Delete);

module.exports = router.routes();
