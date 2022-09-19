const axios = require("axios").default;
const bossStateDAO = require("../dao/bossStateDAO");

module.exports = async (req, res, next) => {
  const redis = req.app.get("redis");

  if (!redis) {
    return next();
  }

  if (!(await redis.json.get("bossData"))) {
    const response = await axios.get(process.env.BOSS_URL);
    const bossRaidsData = response.data.bossRaids[0];
    await redis.json.set("bossData", "$", bossRaidsData);
  }

  if (!(await redis.json.get("bossState"))) {
    await redis.json.set("bossState", "$", bossStateDAO(true, null));
  }

  next();
};
