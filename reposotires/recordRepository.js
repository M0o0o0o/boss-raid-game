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

module.exports = { findUserRecord };
