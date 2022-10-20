const PostService = require('../services/posts.service');
const CommentService = require('../services/comments.service') 

class PostsController {
  postService = new PostService();
  commentService = new CommentService();

  // 게시글 목록을 보여주는 함수
  getPosts = async (req, res, next) => {
    const posts = await this.postService.findAllPost();
    res.status(200).json({ data: posts });
  };

  // 특정 게시물을 보여주는 함수
  getPostById = async (req, res, next) => {
    try{
      const { postId } = req.params;
      const post = await this.postService.findPostById(postId);
      res.status(200).json({ post : post });
    } catch(err) {
      res.status(400).json({ err : err.message });
    }
  };

  // 게시글 생성하는 함수
  createPost = async (req, res, next) => {
    const { title, content } = req.body;
    const { userId, nickname } = res.locals.user
    const createPostData = await this.postService.createPost(
      userId,
      nickname,
      title,
      content,
    );
    res.status(201).json({ data: createPostData });
  };

  // 게시글 수정하기 위한 함수
  updatePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { title, content } = req.body;
      const { nickname } = res.locals.user; 

      const updatePost = await this.postService.updatePost(
        postId,
        nickname,
        title,
        content
      );

      res.status(200).json({ data: updatePost });
    } catch(err) {
      res.status(400).json({ err : err.message });
    }
    
  };

  // 게시글 삭제하는 함수
  deletePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { nickname } = res.locals.user;
  
      const deletePost = await this.postService.deletePost(postId, nickname);
  
      res.status(200).json({ data: deletePost });
    }catch(err) {
      res.status(400).json({ err : err.message });
    }
  };

  // 좋아요 하는 함수
  putLike = async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;
    const putLike = await this.postService.putLike(postId, userId);

    res.status(200).json({ data : putLike })
  }

  // 자기가 좋아요 올린 게시글 찾는 함수
  getLike = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const getLike = await this.postService.getLike(userId);
  
      res.status(200).json({ data : getLike })
    } catch(err) {
      res.status(400).json({ err : err.message })
    }
  }

}

module.exports = PostsController; 