const express = require("express");
const { searchProducts } = require("../controllers/productController");
const protect = require("../middlewares/auth");
const rateLimiter = require("../middlewares/rateLimitter");

const router = express.Router();

router.get("/search", protect, rateLimiter, searchProducts);

module.exports = router;
