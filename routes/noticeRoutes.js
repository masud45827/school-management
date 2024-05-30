const Router = require('koa-router');
const upload = require('../middleware/imageUpload');
const { postNotice, getNotice } = require('../controllers/noticeUploadController');
const { verifyToken } = require('../middleware/checkAdmin');
const router = new Router();

router.post('/',verifyToken, upload.single('pdf'), postNotice);

router.get('/',getNotice);


module.exports = router.routes();