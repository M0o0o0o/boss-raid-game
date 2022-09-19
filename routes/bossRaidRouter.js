const express = require("express");
const router = express.Router();

const { bossController } = require("../controllers");

const {
  bossEnterValidator,
  bossEndValidator,
} = require("../validator/bossValidator");

/**
 * @Todo 레디스가 연결되지 않은 상황에 대한 예외 처리
 * @Todo 보스레이드 시작 시 입력받은 데이터에 대한 검증 처리
 */
// 보스레이드 상태 조회
router.get("/", bossController.getBossState);
//보스레이드 시작
router.post("/enter", bossEnterValidator(), bossController.enterBossRoom);
//보스레이드 종료
router.patch("/end", bossEndValidator(), bossController.endBossRoom);
//보스레이드 랭킹 조회
router.get("/topRankerList", bossController.getRanking);

module.exports = router;
