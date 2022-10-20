1. npm init -y                                  // package.json 설치
2. npm install                                  // package-lock.json 설치
3. npm i express                                // express 설치
4. npm i sequelize mysql2 -S                    // mysql 사용하기 위한 모듈1
5. npm i sequelize-cli -D                       // mysql 사용하기 위한 모듈2
6. npx sequelize init                           // sequelize를 사용하기 위한 모듈
7. npx sequelize db:create                      // 데베 생성  ( config.json 확인 )
8. npx sequelize db:migrate                     // 데베 이동
9. npx sequelize db:migrate:undo:all            // 표 바꿔야 하는 경우 다 없앰
10. npm install jsonwebtoken                    // jwt 사용하기 위한 모듈
11. npm i jest -D                               // 테스트 코드를 위한 모듈 (참고로 package.json 가서 script부분 test: "jest" 로 변경)
12. npm i dotenv                                // 깃 올리기전에 암호화하기 위한 모듈
13. npm i socket.io -S                          // (선택사항) 나중에 socket.io 가 필요하면 설치
14. npm i swagger-ui-express swagger-autogen    // swagger 모듈 설치 -> swagger 이용한 app.js, swagger.js 다 필요, npm run swagger-autogen
15. npm install cookie-parser --save            // 쿠키~~ 모듈
16. npm install crypto --save                   // 암호화

- npm i mongoose                                // 몽구스 사용할 경우 모듈 설치

폴더 및 파일

config                                          // 데이터베이스(sql) 연결

middleware                                      // 로그인 했는지 거쳐가는 미들웨어

migration                                       // 데베내용 CRUD 해주는 곳

models                                          // 데베내용 표, 틀로 만들어주는 곳

routes                                          // app.js가기전에 중간 경로

controller                                      // 3계층 아키텍처 중 첫번째 : 고객과 서비스 중간 경로, 고객 요청을 처리하고 결과를 반환

services                                        // 3계층 아키텍처 중 두번째 : 컨트롤로와 레포지토리 중간 경로, 핵심적인 로직, 요구사항을 구현

repository                                      // 3계층 아키텍처 중 세번째 : 저장소, 데베와 관련된 작업

seeders ( 그냥 있는 거 )                         // 그냥 있는 애

app.js                                          // 모든걸 시작하는 곳






해야하는 구성
게시글(Posts) : 조회 생성 수정 삭제

댓글(Comments) : 조회 생성 수정 

좋아요(Likes) : 조회 좋아요 게시글, 좋아요 올리기

회원가입

로그인




파일 묶음 (js)

회원가입,로그인 : members.routes, members.controller, members.service, members.repository

게시글, 좋아요 : posts.routes, posts.controller, posts.service, posts.repository

댓글 : comments.routes, comments.controler, comments.service, comments.repository


SQL ( 이 부분을 어떻게 짤지는 잘 생각 )

회원가입, 로그인 : models : users, migration : users

게시글 : models : posts, migration : posts

댓글 : models : comments, migration : comments

좋아요 : models : likes, migration : likes

