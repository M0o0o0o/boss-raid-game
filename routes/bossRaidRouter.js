const express = require("express");
const router = express.Router();

// 보스레이드 상태 조회
router.get("/");
//보스레이드 시작
router.post("/enter");
//보스레이드 종료
router.patch("/end");
//보스레이드 랭킹 조회
router.get("/topRankerList");
module.exports = router;
