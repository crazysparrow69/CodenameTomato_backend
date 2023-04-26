const Task = require("../model/Task");

const getTasks = async (req, res) => {
  try {
    const foundTasks = await Task.find({ userId: req.userId });

    res.json({ foundTasks });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Could not get tasks",
    });
  }
};

const createTask = async (req, res) => {
  const { title, description, deadline } = req.body;

  if (!title || !description || !deadline) {
    res.sendStatus(400);
  }

  if (
    title.length < 3 ||
    description.length < 3 ||
    deadline === ""
  ) {
    res.sendStatus(400);
  }

  try {
    const result = await Task.create({
      userId: req.userId,
      title,
      description,
      deadline,
    });

    res.status(201).json({ message: "New task created" });
  } catch (err) {
    console.log(err);
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  if (!taskId) res.status(400).json({ message: "Id required" });

  try {
    Task.deleteOne({ _id: taskId }, function (err, doc) {
      if (err)
        return res.status(500).json({ message: "Internal server error" });
      if (!doc)
        return res.status(400).json({ message: "Couldn't find the task" });
    });

    res.json({ message: "Task deleted" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createTask, deleteTask, getTasks };
