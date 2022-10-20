const express = require('express');
const router = express.Router();

const MembersController = require('../controllers/members.controller');
const membersController = new MembersController();


// 회원가입
router.post('/signup', membersController.signUpMember);

// 로그인
router.post('/login', membersController.loginMember);

module.exports = router;