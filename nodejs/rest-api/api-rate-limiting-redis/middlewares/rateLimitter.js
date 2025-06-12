const redisClient = require("../db/config/redisClient");

const rateLimiter = async (req, res, next) => {
  const plan = req.cookies.plan;
  const key = req.ip;

  if (plan !== "free") return next();

  const WINDOW = 60;
  const LIMIT = 5;

  const redisKey = `rate:${key}`;
  try {
    const current = await redisClient.get(redisKey);
    if (current && parseInt(current) >= LIMIT) {
      return res.status(429).json({
        message: "Too many requests, try again later.",
      });
    }

    if (current) {
      await redisClient.incr(redisKey);
    } else {
      await redisClient.set(redisKey, 1, {
        EX: WINDOW,
        NX: true,
      });
    }
    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = rateLimiter;
