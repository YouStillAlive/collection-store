const Router = require('express');
const collectionController = require('../controller/collectionController.js');
const router = new Router();
const authCheck = require('../middleware/auth.js');

router.post('/add', collectionController.add);
router.post('/update', collectionController.update);
router.post('/delete', collectionController.delete);
router.post('/read', collectionController.read);
router.get('/collections', collectionController.getAll);
router.post('/usercollection', collectionController.getByUserId);

module.exports = router;