const Router = require('koa-router');
const upload = require('../middleware/imageUpload');
const { postResult, getResult } = require('../controllers/resultController');
const router = new Router();

router.post('/upload',upload.single('pdf'), postResult);
router.get('/',getResult);

module.exports = router.routes();