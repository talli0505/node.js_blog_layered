const MemberRepository = require('../repositories/members.repository');
const {Users} = require("../models");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const crypto = require('crypto');

class MemberService {
  memberRepository = new MemberRepository();

  // 회원가입
  signUpMember = async (nickname, password, confirm) => {

    let checkNickname = /^[a-zA-Z0-9]{3,30}$/ 
    let checkPassword = /^[a-zA-Z0-9]{4,30}$/

    if(!checkNickname.test(nickname)) {                              // 입력 아이디와 정규식 비교
      return '아이디를 제대로 입력해주세요'
    }

    if(!checkPassword.test(password)) {                              // 비밀 번호와 정규식 비교 (중복 거르기)
      return '비밀번호를 제대로 입력해주세요'
    }
  
    // includes가 안먹혀서 일단 제외
    // if(password.includes(nickname)) {                               // 비번이 아이디에 들어가있는 값인 경우
    //   return '아이디와 비밀번호에 같은값이 들어가 있습니다.'
    // }

    if (password !== confirm) {                                     // 비빌번호 와 한번 더 입력한게 다른 경우
      return "패스워드가 패스워드 확인란과 동일하지 않습니다."
    }

    const existUsers = await Users.findAll({                        // 닉네임이 사용되는 경우
          where: {
            nickname, 
          },
        });
    if (existUsers.length) {
      return "닉네임이 이미 사용중입니다."
    }

    let salt = crypto.randomBytes(32).toString('base64')
    // 반복 횟수 한번 늘려보자
    let Password = crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('base64')
    console.log(Password)

    const createMemberData = await this.memberRepository.signUpMember(
      nickname,
      Password,
      salt
    );

    return createMemberData;
  }

  // 로그인
  loginMember = async (nickname, password) => {

    const createMemberLogin = await this.memberRepository.loginMember(nickname);

    let salt = createMemberLogin.salt
    let Password = crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('base64')
    

    if (!createMemberLogin.nickname || Password !== createMemberLogin.password) {
      return "닉네임 또는 패스워드를 확인해주세요."
    }                   

    return {createMemberLogin}
  };
}

module.exports = MemberService;