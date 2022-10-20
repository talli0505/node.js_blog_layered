const MemberService = require('../services/members.service'); 
const jwt = require("jsonwebtoken")
require("dotenv").config();


class MembersController {
  MemberService = new MemberService();

  // 회원가입
  signUpMember = async (req, res, next) => {
    const { nickname, password, confirm } = req.body;
    
    const createMemberData = await this.MemberService.signUpMember(
      nickname,
      password,
      confirm
    );
    

    res.status(201).json({ data: createMemberData });
  }

  //로그인
  loginMember = async (req, res, next) => {
    const { nickname, password } = req.body;
    const createMemberLoginData = await this.MemberService.loginMember(
      nickname,
      password
    );

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60);

    const token = jwt.sign( { nickname: nickname }, process.env.SECRET_KEY,
    { expiresIn: "1000000s" }
    );

    res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, {
      expires: expires,
    });

    res.status(201).json({ token });
  }
}

module.exports = MembersController;