# 🔗목차

[요구사항 분석](#-요구사항-분석)

[API 문서](#-api-문서)

[테스트 케이스](#-테스트-케이스)

[컨벤션](#-컨벤션)

[ERD](#-erd)

[폴더 구조](#-폴더-구조)

[패키지](#-패키지)

[기술 스택](#-기술-스택)

[역할분담 및 트러블 슈팅](#-역할분담-및-트러블-슈팅)

# 🚩 Boss Raid Game

**보스 레이드 게임 서비스입니다.**

### ✔ 기능 설명

# ✅ 요구사항 분석

# 📑 API 문서

# 📜 테스트 케이스

<!-- <img width="1608" alt="스크린샷 2022-09-07 오후 1 41 44" src="https://user-images.githubusercontent.com/68809337/188790312-8e9520ab-1d2d-48db-96b0-45ca81afc828.png"> -->

# 💡 컨벤션

### ✔ camelCase / PascalCase

- **파일, 생성자, 변수, 메서드명**은 **camelCase**를 사용합니다.
- **클래스명**은 **PascalCase**를 사용합니다.

### ✔ Lint 규칙

| 들여쓰기 2칸             | 탭 사용 x                    |
| ------------------------ | ---------------------------- |
| double quote 사용.       | commonJS 사용                |
| 마지막 콤마 사용         | 한줄 최대 글자수: 80         |
| var는 사용하지 않습니다. | 세미 콜론 사용을 허용합니다. |

### ✔ 메서드명 규칙

- 전체조회는 복수형으로 작성합니다.

| 요청 내용 | service | example    | repo          | example     |
| --------- | ------- | ---------- | ------------- | ----------- |
| 생성      | add     | addPost    | create        | createPost  |
| 조회      | get     | getPost    | find요청객체  | findPost    |
| 전체조회  | get     | getPosts   | find요청객체s | findPosts   |
| 수정      | set     | setPost    | update        | updatePost  |
| 삭제      | delete  | deletePost | destroy       | destroyPost |

### ✔ 주석

- 메서드 및 코드 설명을 주석으로 간단하게 작성합니다.

### ✔ Git commit

![image](https://user-images.githubusercontent.com/80232260/188366205-84d8a796-3c51-4eb0-bb29-3a61c96bb047.png)

[깃 커밋 컨벤션 참고 사이트](https://overcome-the-limits.tistory.com/entry/협업-협업을-위한-기본적인-git-커밋컨벤션-설정하기)

# 🗝 ERD

<img width="391" alt="스크린샷 2022-09-07 오후 2 26 29" src="https://user-images.githubusercontent.com/68809337/188795669-5fe4f957-82fb-4523-b5e4-f558b7566c9a.png">

# 🗂 폴더 구조

```

📦anonymous-community
 ┣ 📂__test__
 ┣ 📂codes
 ┣ 📂controller
 ┣ 📂dao
 ┣ 📂database
 ┃ ┣ 📂models
 ┣ 📂middlewares
 ┣ 📂repository
 ┣ 📂routes
 ┣ 📂service
 ┣ 📂swagger
 ┣ 📂validator
 ┣ 📂weatherapi
 ┃ ┗ 📜index.js
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜.prettierrc.json
 ┣ 📜LICENSE
 ┣ 📜app.js
 ┣ 📜package.json
 ┗ 📜server.js
```

# ⚙ 패키지

```json
{
  "name": "boss-raid-game",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "npx cross-env NODE_ENV=test mocha __test__/*.test.js",
    "start": "nodemon server.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/M0o0o0o/boss-raid-game.git"
  },
  "author": "",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/M0o0o0o/boss-raid-game/issues"
  },
  "homepage": "https://github.com/M0o0o0o/boss-raid-game#readme",
  "dependencies": {
    "axios": "^0.27.2",
    "bcrypt": "^5.0.1",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "cross-env": "^7.0.3",
    "express": "^4.18.1",
    "express-validator": "^6.14.2",
    "jsonwebtoken": "^8.5.1",
    "moment": "^2.29.4",
    "morgan": "^1.10.0",
    "mysql2": "^2.3.3",
    "redis": "^4.3.1",
    "sequelize": "^6.21.4",
    "uuid": "^8.3.2",
    "winston": "^3.8.1",
    "winston-daily-rotate-file": "^4.7.1"
  },
  "devDependencies": {
    "@babel/eslint-parser": "^7.18.9",
    "chai": "^4.3.6",
    "dotenv": "^16.0.2",
    "eslint": "^8.23.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.2.1",
    "mocha": "^10.0.0",
    "nodemon": "^2.0.19",
    "prettier": "^2.7.1",
    "sequelize-cli": "^6.4.1",
    "supertest": "^6.2.4",
    "swagger-jsdoc": "^6.2.5",
    "swagger-ui-express": "^4.5.0"
  }
}
```

# ⚡ 기술 스택

<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/express-FCC624?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/Sequelize-007396?style=for-the-badge&logo=Sequelize&logoColor=white">
<img src="https://img.shields.io/badge/Swagger-61DAFB?style=for-the-badge&logo=Swagger&logoColor=white"> <img src="https://img.shields.io/badge/Mocha-F8DC75?style=for-the-badge&logo=Mocha&logoColor=white">

<!-- logger chai 추가 -->

# ✋ 트러블 슈팅

###
