const express = require("express");
const { searchTodos } = require("../controllers/todoController");
const protect = require("../middlewares/auth");
const rateLimiter = require("../middlewares/rateLimitter");

const router = express.Router();

router.get("/search", protect, rateLimiter, searchTodos);

module.exports = router;
