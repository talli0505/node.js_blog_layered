const express = require('express');
const router = express.Router();

const postsRouter = require('./posts.routes');
const membersRouter =require('./members.routes');
const commentsRouter = require('./comments.routes')
router.use(postsRouter);
router.use(membersRouter);
router.use(commentsRouter);

module.exports = router;