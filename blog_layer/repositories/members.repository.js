const { Users } = require('../models');
class MemberRepository {

  // 회원가입
  signUpMember = async (nickname, password, salt) => {
    
    const createsignUpMemberData = await Users.create({
      nickname,
      password,
      salt
    });

    return createsignUpMemberData;
  }; 

  // 로그인
  loginMember = async (nickname) => {
    const createsignUpMemberData = await Users.findOne({where : {nickname}}
    );

    return createsignUpMemberData;
  }
}

module.exports = MemberRepository;