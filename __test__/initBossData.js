const bossStateDAO = require("../dao/bossStateDAO");
const Redis = require("redis");
module.exports = async () => {
  const redis = Redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    password: process.env.REDIS_KEY,
  });
  await redis.connect();
  await redis.json.set("bossState", "$", bossStateDAO(true, null));
  await redis.json.set("bossRoom", "$", null);

  await redis.disconnect();
};
