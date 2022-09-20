const { bossService } = require("../services");

module.exports = async (req, res, next) => {
  const redis = req.app.get("redis");

  if (!redis) {
    return next();
  }

  bossService.getRanking(redis);

  next();
};
