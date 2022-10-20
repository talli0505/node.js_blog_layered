const PostRepository = require('../repositories/posts.repository')
const CommentRepository = require('../repositories/comments.repository');

class CommentService {
  commentRepository = new CommentRepository();
  postRepository = new PostRepository();

  // 댓글을 생성하는 함수
  createComments = async (postId, nickname, comment) => {
    const createCommentData = await this.commentRepository.createComments(
      postId,
      nickname,
      comment
    );

    return createCommentData
  };

  // 특정 댓글을 찾아주는 함수
  findCommentById = async (commentId) => {
    const findComment = await this.commentRepository.findCommentById(commentId);

    return findComment
  };

  // 특정 댓글이 있는 게시글을 같이 찾아서 그걸 수정하는 함수
  updateComments = async (postId, commentId, nickname, comment) => {
    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) throw new Error("게시물이 더 이상 존재하지 않습니다.");

    const [updateComments] = await this.commentRepository.updateComments(postId, commentId, nickname, comment);
    if(updateComments) {
      return { 'msg' : '수정완료' };
    }else {
      throw new Error('댓글이 없거나 수정 불가')
    }
  };

  // 댓글을 삭제하는 함수
  deleteComments = async (postId, commentId, nickname) => {
    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) throw new Error("게시물이 더 이상 존재하지 않습니다.");

    const deleteComment = await this.commentRepository.deleteComments(commentId, nickname);
    if (!deleteComment) {
      throw new Error('댓글이 없거나 삭제 불가')
    } else {
      return { 'msg' : '삭제완료' };
    }
  };
}

module.exports = CommentService;