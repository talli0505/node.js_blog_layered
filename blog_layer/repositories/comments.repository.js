const { Comments } = require('../models'); 

class CommentRepository {

  // 댓글을 생성하는 함수
  createComments = async (postId, nickname, comment) => {
    const createCommentData = await Comments.create({
      postId,
      nickname,
      comment,
    });

    return createCommentData;
  };

  // 특정 게시글에 대한 조회를 하기 위한 함수
  findAllComment = async (postId) => {
    const allComment = await Comments.findAll({where : {postId}}) 
    return allComment;
  }

  // 로그인한 사람의 댓글을 찾기 위한 함수
  findCommentById = async (commentId) => {
    const comment = await Comments.findByPk(commentId);

    return comment;
  };

  // 댓글을 수정하기 위한 함수
  updateComments = async (postId, commentId, nickname, comment) => {
    const updateCommentData = await Comments.update(
      { comment },
      { where: { postId, commentId, nickname} }
    );

    return updateCommentData;
  };

  // 댓글을 삭제하기 위한 함수
  deleteComments = async (commentId, nickname) => {
    const deleteCommentData = await Comments.destroy({ where: { commentId, nickname } });

    return deleteCommentData;
  };
}

module.exports = CommentRepository;