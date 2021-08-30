const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter.js');
const collectionRouter = require('./collectionRouter.js');
const itemRouter = require('./itemRouter');

router.use('/user', userRouter);
router.use('/collection', collectionRouter);
router.use('/item', itemRouter);

module.exports = router;