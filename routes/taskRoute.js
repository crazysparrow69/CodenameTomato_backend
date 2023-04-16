const express = require('express');
const router = express.Router();
const { createTask, deleteTask } = require('../controllers/taskController');

router.post('/', createTask)
      .delete('/:id', deleteTask);

module.exports = router;