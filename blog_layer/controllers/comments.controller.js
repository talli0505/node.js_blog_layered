const CommentService = require('../services/comments.service');

class CommentsController {
  commentService = new CommentService();

  // 댓글 생성하는 함수
  createComments = async (req, res, next) => {
    try{
      const {postId} = req.params;
      const {comment} = req.body;
      const {nickname} = res.locals.user;

      const createCommentData = await this.commentService.createComments(
        postId,
        nickname,
        comment
      );
  
      res.status(201).json({ data: createCommentData });
    } catch(err) {
      res.status(400).json({ err : err.message })
    }
  };

  // 댓글 수정하는 함수
  updateComments = async (req, res, next) => {
    try{
      const { postId, commentId } = req.params;
      const { comment } = req.body;
      const { nickname } = res.locals.user;

      const updateComment = await this.commentService.updateComments(
        postId,
        commentId,
        nickname,
        comment
      ); 
  
      res.status(200).json({ data: updateComment }); 
    } catch(err) {
      res.status(400).json({ err : err.message })
    }
  };


  // 댓글 삭제하는 함수
  deleteComments = async (req, res, next) => {
    try {
      const { postId, commentId } = req.params;
      const { nickname } = res.locals.user;

      const deleteComment = await this.commentService.deleteComments(postId, commentId, nickname);

      res.status(200).json({ data: deleteComment });
    } catch(err) {
      res.status(400).json({ err : err.message })
    }
  };
}

module.exports = CommentsController; 