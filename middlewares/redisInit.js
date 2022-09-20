const Redis = require("redis");

module.exports = async (req, res, next) => {
  if (req.app.get("redis")) {
    return next();
  }

  const redis = Redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    password: process.env.REDIS_KEY,
  });

  redis.on("error", (err) => {
    req.app.set("redis", null);
    next();
  });

  await redis.connect();
  req.app.set("redis", redis);

  next();
};
