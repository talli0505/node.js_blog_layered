const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware')

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

// 게시글 목록 조회
router.get('/post', postsController.getPosts);

// 좋아요한 게시글 조회
router.get('/post/like', authMiddleware, postsController.getLike);

// 특정 게시글 조회
router.get('/post/:postId', postsController.getPostById);

// 게시글 생성
router.post('/post', authMiddleware, postsController.createPost);

// 특정 게시글 수정
router.put('/post/:postId', authMiddleware, postsController.updatePost);

// 특정 게시글 삭제
router.delete('/post/:postId', authMiddleware, postsController.deletePost);

// 특정 게시글 좋아요
router.put('/post/:postId/like', authMiddleware, postsController.putLike);

module.exports = router;  