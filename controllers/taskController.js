const Task = require("../model/Task");

const createTask = async (req, res) => {
  const { title, description, deadline, date } = req.body;

  if (!title || !description || !deadline || !date) {
    res.sendStatus(400);
  }

  if (title.length < 3 || description.length < 3 || deadline === "" || date === "") {
    res.sendStatus(400);
  }

  try {
    const result = await Task.create({
      title,
      description,
      deadline,
      date
    });

    console.log(result);
    res.status(201).json({ "message": "New task created" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createTask };