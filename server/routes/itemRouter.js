const Router = require('express');
const itemController = require('../controller/itemController.js');
const router = new Router();
const authCheck = require('../middleware/auth.js');

router.post('/add', itemController.add);
router.post('/update', itemController.update);
router.post('/delete', itemController.delete);
router.get('/read', itemController.read);
router.get('/items', itemController.getAll);

module.exports = router;