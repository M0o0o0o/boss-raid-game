const express = require("express");
const router = express();

const userRouter = require("./userRouter");
const bossRaidRouter = require("./bossRaidRouter");

// 유저 생성
router.use("/user", userRouter);
// 유저 조회
router.use("/bossRaid", bossRaidRouter);

module.exports = router;
