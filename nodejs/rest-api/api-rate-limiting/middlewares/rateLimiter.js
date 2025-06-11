const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per `windowMs`
  message: "Too many requests from this IP, please try again after a minute.",
});

const conditionalLimiter = (req, res, next) => {
  const plan = req.cookies.plan;
  if (plan === "free") return limiter(req, res, next);
  else return next();
};

module.exports = conditionalLimiter;
