const { Posts } = require("../models");
const { Comments } = require("../models");
const { Likes } = require("../models");

class PostRepository {
  // 게시글 모두 찾기 위한 함수
  findAllPost = async () => {
    const posts = await Posts.findAll();
    return posts;
  };

  // 게시글 좋아요 누른 사람 좋아요 표에서 찾는 함수
  findOneLikes = async (postId, userId) => {
    const likes = await Likes.findOne({ where: { postId, userId } }); 
    return likes;
  };

  findPost = async (postId) => {
    const post = await Posts.findOne({where : {postId}})
    return post;
  }

  // 특정 게시글에 누가 댓글 달았는지 찾는 함수
  findPostById = async (postId) => {
    const post = await Posts.findByPk(postId);
    const comment = await Comments.findAll({ where: { postId } });

    return {
      postId: post.postId,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      likes: post.likes,
      comments: comment,
    };
  };

  // 게시글 만들기 위한 함수
  createPost = async (userId, nickname, title, content, likes) => {
    const createPostData = await Posts.create({
      userId,
      nickname,
      title,
      content,
      likes,
    });
    return createPostData;
  };

  // 게시글 수정을 위한 함수
  updatePost = async (postId, nickname, title, content) => {
    const updatePostData = await Posts.update(
      { title, content },
      { where: { postId, nickname } }
    );

    return updatePostData;
  };

  // 게시글 삭제를 위한 함수
  deletePost = async (postId, nickname) => {
    const updatePostData = await Posts.destroy({ where: { postId, nickname } });

    return updatePostData;
  };

  // 좋아요를 눌렀을 시 함수
  putLike = async (postId, userId) => {
    await Posts.increment({ likes: 1 }, { where: { postId } });
    const putLike = await Likes.create({ postId, userId });

    return putLike;
  };

  // 싫어요를 눌렀을 시 함수
  putHate = async (postId, userId) => {
    await Posts.decrement({ likes: 1 }, { where: { postId } });
    const putHate = await Likes.destroy({ where: { postId, userId } });

    return putHate;
  };

  // 좋아요 조회를 위한 함수
  getLike = async (userId) => {
    const getlikes = await Likes.findOne({ where: { userId } });
    return getlikes;
  };
}

module.exports = PostRepository;
