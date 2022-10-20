const CommentRepository = require('../repositories/comments.repository');
const PostRepository = require('../repositories/posts.repository'); 

class PostService {
  commentRepository = new CommentRepository();
  postRepository = new PostRepository();

  // repository에서 findAllPost를 받아와 게시글 전체 목록 보여주는 함수
  findAllPost = async () => { 
    const allPost = await this.postRepository.findAllPost();

    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return allPost
  };

  // 특정 게시물을 골라 보여주기위한 함수  
  findPostById = async (postId) => {
    try{
      const findPost = await this.postRepository.findPostById(postId);
      const findComment = await this.commentRepository.findAllComment(postId);

      return {
        postId: findPost.postId,
        nickname: findPost.nickname,
        title: findPost.title,
        content: findPost.content,
        createdAt: findPost.createdAt,
        updatedAt: findPost.updatedAt,
        likes : findPost.likes,
        comments : findComment
      }
    } catch(Err) {
      throw new Error("게시물이 더 이상 존재하지 않습니다.");
    }    
  };

  // 게시글 생성을 위한 함수
  createPost = async (userId, nickname, title, content, likes) => {
    const createPostData = await this.postRepository.createPost(
      userId,
      nickname,
      title,
      content,
      likes
    );
    return createPostData
    
  };

  // 게시글 수정을 위한 함수
  updatePost = async (postId, nickname, title, content) => {

    const [updatePost] = await this.postRepository.updatePost(postId, nickname, title, content);
    if(updatePost) {
      return { 'msg' : '수정완료' };
    }else {
      throw new Error('게시글이 없거나 수정 불가')
    }
  };

  // 게시글 삭제를 위한 함수 -> 이 부분 제대로 파악...
  deletePost = async (postId, nickname) => {
    const deletePost =  await this.postRepository.deletePost(postId, nickname);
    if (!deletePost) {
      throw new Error('게시글이 없거나 삭제 불가')
    } else {
      return { 'msg' : '삭제완료' };
    }
  };

  // 좋아요를 하기 위한 함수
  putLike = async (postId, userId) => {
    const isPutLike = await this.postRepository.findOneLikes(postId, userId)

    if(!isPutLike) {
      await this.postRepository.putLike(postId, userId)
      return {'msg' : '좋아요를 올렸습니다.'}
    } else {
      await this.postRepository.putHate(postId, userId)
      return {'msg' : '좋아요를 내렸습니다.'}
    }
  
  }

  // 좋아요 게시글을 보여주기 위한 함수
  getLike = async (userId) => {
      const allPost = await this.postRepository.findAllPost();
      // console.log(allPost)
      const allLike = await this.postRepository.getLike(userId);
      // console.log(allLike)
      allPost.sort((a, b) => {
        return b.likes - a.likes;
      });

      const data = []
      for (let i = 0; i < allPost.length; i++) {
        if(allLike.userId === userId && allLike.postId === allPost[i].postId) {
            data.push({
                postId: allPost[i].postId,
                userId: allPost[i].userId,
                nickname: allPost[i].nickname,
                title: allPost[i].title,
                createdAt: allPost[i].createdAt,
                updatedAt: allPost[i].updatedAt,
                likes: allPost[i].likes
            });
        }
    }
    return { data : data };
    
  }
}

module.exports = PostService; 