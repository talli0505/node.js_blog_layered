const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware')

const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();

// 댓글 작성
router.post('/post/:postId/comment', authMiddleware, commentsController.createComments);

// 댓글 수정
router.put('/post/:postId/:commentId', authMiddleware, commentsController.updateComments);

// 댓글 삭제
router.delete('/post/:postId/:commentId', authMiddleware, commentsController.deleteComments);

module.exports = router;   