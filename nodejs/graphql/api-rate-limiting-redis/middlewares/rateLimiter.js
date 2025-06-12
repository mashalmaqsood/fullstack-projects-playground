const { createClient } = require("redis");
const redis = createClient();

redis.connect();

const rateLimiter = async (req, res, next) => {
  const key = `rate_limit:${req.ip}`;
  try {
    const count = await redis.incr(key);

    if (count === 1) {
      await redis.expire(key, 60);
    }

    if (count > 5) {
      return res.status(429).json({
        error: "Rate limit exceeded. Try again in a minute.",
      });
    }

    next();
  } catch (err) {
    console.error("Redis error", err);
    next();
  }
};

module.exports = rateLimiter;
