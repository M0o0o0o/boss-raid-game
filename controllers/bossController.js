const { bossService } = require("../services");

/**
 * @Todo redis 연결이 안되서 null인 경우에 대한 예외처리
 */
const getBossState = async (req, res, next) => {
  // service를 통해 버스의 상태를 조회하는 값을 조회
  try {
    const redis = req.app.get("redis");
    const bossState = await bossService.getBossState(redis);
    res.status(200).json(bossState);
  } catch (err) {
    next(err);
  }
};

const enterBossRoom = async (req, res, next) => {
  try {
    const { userId, level } = req.body;
    const redis = req.app.get("redis");
    const result = await bossService.enterBossRoom(userId, level, redis);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const endBossRoom = async (req, res, next) => {
  try {
    const { raidRecordId, userId } = req.body;
    console.log(userId);
    const redis = req.app.get("redis");
    await bossService.endBossRoom(raidRecordId, userId, redis);
    res.status(201).end();
  } catch (err) {
    next(err);
  }
};

const getRanking = async (req, res, next) => {
  try {
    const redis = req.app.get("redis");
    const ranking = await bossService.getRanking(redis);
    res.status(200).json(ranking);
  } catch (err) {
    next(err);
  }
};

const getUserRanking = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const userRank = await bossService.getUserRanking(userId);
    res.status(200).json(userRank);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBossState,
  enterBossRoom,
  endBossRoom,
  getRanking,
  getUserRanking,
};
