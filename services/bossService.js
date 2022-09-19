const { userRepository, recordRepository } = require("../reposotires");
const { v4: uuidv4 } = require("uuid");
const bossRoomDAO = require("../dao/bossRoomDAO");
const bossStateDAO = require("../dao/bossStateDAO");
const moment = require("moment");
const errorCodes = require("../codes/errorCodes");

const getBossState = async (redis) => {
  return await redis.json.get("bossState");
};

const enterBossRoom = async (userId, level, redis) => {
  try {
    if (!(await userRepository.findUser(userId))) {
      throw new Error(errorCodes.NOTFOUNDUSER);
    }

    // redis에서 보스 방에 사용자가 들어가 있는지 확인하고 들어가 있지 않다면
    // 바로 넣어준다.
    const bossState = await redis.json.get("bossState");
    if (!bossState.canEnter) {
      return { isEntered: false };
    }

    const bossRoom = bossRoomDAO(userId, moment().valueOf(), level);

    // await redis.json.set("bossRoom", "$", bossRoom);
    await redis.executeIsolated(async (isolatedClient) => {
      await redis.json.get("bossRoom");
      await redis.json.set("bossRoom", "$", bossRoom);
    });
    await redis.json.set("bossState", "$", bossStateDAO(false, userId));

    return { isEntered: true, raidRecordId: bossRoom.raidRecordId };
  } catch (err) {
    throw err;
  }
};

const endBossRoom = async (raidRecordId, userId, redis) => {
  // 우선 raidRecordId와 USerId가 일치하는지 확인
  // 그에 대한 예외 처리
  const bossRoom = await redis.json.get("bossRoom");

  if (!bossRoom) {
    throw new Error(errorCodes.NOTFOUNDROOM);
  }

  if (bossRoom.raidRecordId !== raidRecordId) {
    throw new Error(errorCodes.NOTSAME("raidRecordId"));
  }

  if (bossRoom.userId !== userId) {
    throw new Error(errorCodes.NOTSAME("userId"));
  }

  // 위에서 userId와 raidRecordId가 일치한다면 시간초가 그 안에 들어왔는지 확인
  const bossData = await redis.json.get("bossData");

  const enterTime = bossRoom.enterTime;
  const bossRaidLimitSeconds = bossData.bossRaidLimitSeconds * 1000;
  const endTime = moment().valueOf();

  if (enterTime - enterTime > bossRaidLimitSeconds) {
    throw new Error(errorCodes.TIMEOUT);
  }

  await recordRepository.createRecord(
    uuidv4(),
    raidRecordId,
    bossData.levels[bossRoom.level - 1].score,
    enterTime,
    endTime,
    userId
  );

  await redis.json.set("bossState", "$", bossStateDAO(true, null));
  await redis.json.set("bossRoom", "$", null);
  return;
};

/**
 * @Tood 넘겨받은 userId가 존재하는지 확인 예외처리 구하기
 */
const getRanking = async (userId) => {
  const ranking = await recordRepository.findRanking();
  return ranking;
};

module.exports = { getBossState, enterBossRoom, endBossRoom, getRanking };
