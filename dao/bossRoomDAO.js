const { v4: uuidv4 } = require("uuid");

module.exports = (userId, enterTime, level) => {
  return {
    raidRecordId: uuidv4(),
    userId,
    enterTime,
    level,
  };
};
