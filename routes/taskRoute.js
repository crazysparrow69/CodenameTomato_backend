const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  deleteTask,
} = require("../controllers/taskController");
const verifyJWT = require("../middleware/verifyJWT");

router
  .get("/", verifyJWT, getTasks)
  .post("/", verifyJWT, createTask)
  .delete("/:id", verifyJWT, deleteTask);

module.exports = router;
