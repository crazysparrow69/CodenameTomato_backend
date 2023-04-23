const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { username, password, repass } = req.body;
  if (!username || !password || !repass)
    return res
      .status(400)
      .json({ message: "Username, password and repass required" });

  if (password !== repass)
    return res.status(400).json({ message: "Passwords are not equal" });

  const duplicate = await User.findOne({ username }).exec();
  if (duplicate)
    return res
      .status(400)
      .json({ message: "User with that name already exists" });

  try {
    const createdUser = await User.create({
      username: username,
      password: await bcrypt.hash(password, 10),
    });

    const token = jwt.sign({ _id: createdUser._id }, process.env.KEY, {
      expiresIn: "30d",
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { createUser };
