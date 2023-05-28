const express = require('express');
const router = express.Router();
const bookRouter = require('./bookRouter')
const userRouter = require('./userRouter')


router.use('/book', bookRouter);
router.use('/user', userRouter)

module.exports = router;