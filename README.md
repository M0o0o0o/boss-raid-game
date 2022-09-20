# 🔗목차

[요구사항 분석](#-요구사항-분석)

[트러블 슈팅](#-트러블-슈팅)

[API 문서](#-api-문서)

[테스트 케이스](#-테스트-케이스)

[컨벤션](#-컨벤션)

[ERD](#-erd)

[폴더 구조](#-폴더-구조)

[패키지](#-패키지)

[기술 스택](#-기술-스택)

# 🚩 Boss Raid Game

**보스 레이드 게임 서비스입니다.**

### ✔ 기능 설명

- 유저

  - 유저 생성 요청이 들어오면 중복되지 않는 고유한 userId를 리턴합니다.
  - 유저 조회를 요청하면 해당 유저의 보스레이드 총 점수와 기록을 리턴합니다.

- 보스

  - 현재 보스방에 입장한 유저가 있는지 상태값을 리턴합니다.
    - { canEnter, enteredUserId}
  - 보스방에 입장한다는 요청이 들어왔을 경우 보스방에 상태를 확인한 후 아무도 없다면 입장이 가능하다는 값을 리턴합니다.
  - 보스방 입장한 유저가 종료 요청을 보냅니다.

- 보스방 관련 데이터
  - 보스방에 초기 상태와 레벨, 시간 제한과 같은 데이터가 static하게 주여집니다.

# ✅ 요구사항 분석

- 주어진 기능 설명를 통해 도출된 요구사항 중 가장 중요한 기능은 보스방에는 한 명의 유저만 입장이 가능하다는 점입니다.
- 보스방과 관련된 데이터는 레디스를 통해서만 관리하기 때문에 race condition이 발생할 수 있는 지점을 확인하고
- 적절하게 처리하는 게 핵심이라고 생각합니다.

- 유저들의 랭킹을 구하는 API에서 레디스에 캐싱을 해서 재활용해야 하기 때문에 node-cron을 이용해서 배치 작업을 추가했습니다.

# ✋ 트러블 슈팅

프로젝트를 진행하면서 가장 중요하게 생각했던 부분은 보스방에는 단 한 명의 유저만 입장할 수 있다는 조건인데, 이를 위해서는 사용하는 환경에서 race condition이 발생할 수 있는 지부터 확인하는 것이 중요했습니다.
node에서 동시성 관련 처리를 위해서 lock을 걸고 처리할 수 있지만, 적절하지 않을 것 같아서 redis에서 동시성 발생이 가능한 지, 가능하다면 어떻게 isolated하게 처리할 수 있는 지 찾아봤습니다.

우선 레디스는 싱글 스레드 기반으로 동작하지만, 내부 동작 방식에 의해서 여러 클라이언트의 요청을 동시에 응답하는 동시성의 특징도 가지고 있다고 합니다. 즉, 여기까지 봤을 때 레디스에서도 충분히 동시성 이슈가 발생할 수 있기 때문에 분명이 이를 방지하는 기능도 있을 거라 생각했습니다.

레디스 공식문서에 따르면 보통의 데이터베이스에서 트랜잭션을 통해 ACID를 보장하는데, 레디스로 트랜잭션을 제공하지만, MySql과 동일하지는 않지만, 트랜잭션(Watch, Multi, exec)을 제공하고 있습니다.

그런데, 보스방에 상태를 확인하고 입장하는 과정에서는 단일 명령을 수행하기 때문에 트랜잭션을 열어서 여러 작업을 지시할 필요가 없기 때문에 사용하고 있는 node-redis에 공식문서(https://redis.io/docs/manual/transactions)를 참고해서 Isolated Execution를 보장받아 레디스에 접근할 수 있는 방식으로 해결했습니다.

# 📑 API 문서

# 📜 테스트 케이스
<img width="942" alt="스크린샷 2022-09-20 오전 10 41 49" src="https://user-images.githubusercontent.com/68809337/191148711-7c4a2db6-586f-4ce7-bc91-193532b2647b.png">

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
<img width="1046" alt="스크린샷 2022-09-20 오전 10 31 46" src="https://user-images.githubusercontent.com/68809337/191147643-b48e9138-a653-49f6-a1f3-f9e3beb20aba.png">


# 🗂 폴더 구조

```
📦boss-raid-game
 ┣ 📂__test__
 ┣ 📂codes
 ┣ 📂controllers
 ┣ 📂dao
 ┣ 📂database
 ┃ ┣ 📂models
 ┣ 📂logger
 ┣ 📂logs
 ┃ ┗ 📂error
 ┣ 📂middlewares
 ┣ 📂reposotires
 ┣ 📂routes
 ┣ 📂services
 ┣ 📂validator
 ┣ 📜app.js
 ┣ 📜package-lock.json
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
    "node-cron": "^3.0.2",
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
