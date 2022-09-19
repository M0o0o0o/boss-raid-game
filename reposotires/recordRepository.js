const { sequelize } = require("../database/models");
const { Record } = require("../database/models");
const logger = require("../logger");

const findUserRecord = async (fk_user_id) => {
  try {
    const findUserTotalScore = await Record.sum("score", {
      where: { fk_user_id },
    });
    const findUserRecords = await Record.findAndCountAll({
      attributes: ["raidRecordId", "score", "enterTime", "endTime"],
      where: {
        fk_user_id,
      },
    });
    return { findUserRecords, findUserTotalScore };
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

const createRecord = async (
  recordId,
  raidRecordId,
  score,
  enterTime,
  endTime,
  fk_user_id
) => {
  try {
    await Record.create({
      recordId,
      raidRecordId,
      score,
      enterTime,
      endTime,
      fk_user_id,
    });
    return;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

const findRanking = async () => {
  try {
    const query = `
    SELECT 
    dense_rank() over(order by totalScore DESC) ranking, userId, totalScore
    FROM
    (SELECT fk_user_id userId, sum(score) totalScore FROM records GROUP BY fk_user_id) t;
  `;
    const ranking = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      raw: true,
    });
    return ranking;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};
module.exports = { findUserRecord, createRecord, findRanking };
