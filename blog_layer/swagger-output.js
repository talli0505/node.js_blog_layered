require("dotenv").config();

module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "My API",
    "description": "Description",
    "version": "1.0.0"
  },
  "host" : "",
  "basePath": "/",
  "schemes": [
    "http"
  ],
  "paths": {
    "/signup": {
      "post": {
        "tags": [
          "Members"
        ],
        "description": "회원가입을 하기 위한 POST입니다.",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "type": "string",
            "schemes" : {
              "properties" : {
                "nickname" : {
                  "type" : "string"
                },
                "password" : {
                  "type" : "string"
                },
                "confirm" : {
                  "type" : "string"
                }
              }
            },
            "example" : {
              "nickname" : "아이디",
              "password" : "비밀번호",
              "confirm" : "비밀번호 확인"
            }
          }
        ],
        "responses": {
          "401": {
            "description": "Unauthorized"
          },
          "200": {
            "description" : "회원가입 성공했습니다."
          }
        }
      }
    },
    "/login": {
      "post": {
        "tags": [
          "Members"
        ],
        "description": "로그인을 하여 토큰을 받기 위한 POST입니다.",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "type": "string",
            "schemes" : {
              "properties" : {
                "nickname" : {
                  "type" : "string"
                },
                "password" : {
                  "type" : "string"
                }
              }
            },
            "example" : {
              "nickname" : "아이디",
              "password" : "비밀번호"
            }
          }
        ],
        "responses": {
          "401": {
            "description": "Unauthorized"
          },
          "200": {
            "description" : "로그인 성공했습니다."
          }
        }
      }
    },
    "/post": {
      "get": {
        "tags": [
          "Posts"
        ],
        "description": "게시글 전체 목록을 확인하기 위한 GET입니다.",
        "parameters": [],
        "responses": {}
      },
      "post": {
        "tags": [
          "Posts"
        ],
        "description": "게시글 생성하기 위한 POST입니다.",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "type": "string",
            "schemes" : {
              "properties" : {
                "title" : {
                  "type" : "string"
                },
                "content" : {
                  "type" : "string"
                }
              }
            },
            "example" : {
              "title" : "안녕하세요",
              "content" : "안녕하세요"
            }
          }
        ],
        "responses": {
          "401": {
            "description": "Unauthorized"
          },
          "200": {
            "description" : "게시글이 생성되었습니다."
          }
        }
      }
    },
    "/post/like": {
      "get": {
        "tags": [
          "Likes"
        ],
        "description": "로그인한 사람이 누른 좋아요 게시글만 보이게 하기위한 GET입니다.",
        "parameters": [],
        "responses": {
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/post/{postId}": {
      "get": {
        "tags": [
          "Posts"
        ],
        "description": "postId에 해당되는 특정한 게시글을 보기위한 GET 입니다.",
        "parameters": [
          {
            "name": "postId",
            "in": "path",
            "required": true,
            "type": "number"
          }
        ],
        "responses": {
          "401": {
            "description": "Unauthorized"
          },
          "200": {
            "description" : "게시글이 보여집니다."
          }
        }
      },
      "put": {
        "tags": [
          "Posts"
        ],
        "description": "postId에 해당되는 특정한 게시글을 수정하기 위한 PUT 입니다.",
        "parameters": [
          {
            "name": "postId",
            "in" : "path",
            "type" : "number"
          },
          {
            "name": "body",
            "in": "body",
            "type": "string",
            "schemes" : {
              "properties" : {
                "postId" : {
                  "type" : "number"
                },
                "title" : {
                  "type" : "string"
                },
                "content" : {
                  "type" : "string"
                }
              }
            },
            "example" : {
              "title" : "안녕하세요",
              "content" : "안녕하세요"
            }
          }
        ],
        "responses": {
          "401": {
            "description": "Unauthorized"
          },
          "200": {
            "description" : "게시글이 수정되었습니다."
          }
        }
      },
      "delete": {
        "tags": [
          "Posts"
        ],
        "description": "postId에 해당되는 특정한 게시글을 삭제하기 위한 DELETE 입니다.",
        "parameters": [
          {
            "name": "postId",
            "in": "path",
            "required": true,
            "type": "number"
          }
        ],
        "responses": {
          "401": {
            "description": "Unauthorized"
          },
          "200": {
            "description" : "게시글이 삭제되었습니다."
          }
        }
      }
    },
    "/post/{postId}/like": {
      "put": {
        "tags": [
          "Likes"
        ],
        "description": "postId에 해당되는 특정한 게시글에 좋아요를 올리거나 내리기위한 PUT입니다.",
        "parameters": [
          {
            "name": "postId",
            "in": "path",
            "required": true,
            "type": "number"
          }
        ],
        "responses": {
          "401": {
            "description": "Unauthorized"
          },
          "200": {
            "description" : "성공했습니다."
          }
        }
      }
    },
    "/post/{postId}/comment": {
      "post": {
        "tags": [
          "Comments"
        ],
        "description": "postId에 해당되는 특정한 게시글에 댓글을 달기 위한 POST입니다.",
        "parameters": [
          {
            "name": "postId",
            "in": "path",
            "required": true,
            "type": "number"
          },
          {
            "name": "body",
            "in": "body",
            "type": "string",
            "schemes" : {
              "properties" : {
                "comment" : {
                  "type" : "string"
                }
              }
            },
            "example" : {
              "comment" : "댓글 내용"
            }
          }
        ],
        "responses": {
          "401": {
            "description": "Unauthorized"
          },
          "200": {
            "description" : "댓글이 생성되었습니다."
          }
        }
      }
    },
    "/post/{postId}/{commentId}": {
      "put": {
        "tags": [
          "Comments"
        ],
        "description": "postID에 해당되는 특정한 게시물에 commentId로 달린 댓글을 수정하기 위한 PUT입니다.",
        "parameters": [
          {
            "name": "postId",
            "in": "path",
            "required": true,
            "type": "number"
          },
          {
            "name": "commentId",
            "in": "path",
            "required": true,
            "type": "number"
          },
          {
            "name": "body",
            "in": "body",
            "type": "string",
            "schemes" : {
              "properties" : {
                "comment" : {
                  "type" : "string"
                }
              }
            },
            "example" : {
              "comment" : "댓글 내용"
            }
          }
        ],
        "responses": {
          "401": {
            "description": "Unauthorized"
          },
          "200": {
            "description" : "댓글이 수정되었습니다."
          }
        }
      },
      "delete": {
        "tags": [
          "Comments"
        ],
        "description": "postID에 해당되는 특정한 게시물에 commentId로 달린 댓글을 삭제하기 위한 DELETE입니다.",
        "parameters": [
          {
            "name": "postId",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "commentId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "401": {
            "description": "Unauthorized"
          },
          "200": {
            "description" : "댓글이 삭제되었습니다."
          }
        }
      }
    }
  }
}