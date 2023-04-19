const User = require("../model/User");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
require("dotenv").config();

const handleAuth = async (req, res) => {
  const { username, password, repass } = req.body;

  if (!username || !password || !repass)
    return res
      .status(400)
      .json({ message: "Username, password and repass required" });

  if (password !== repass)
    return res.status(400).json({ message: "Password are not equal" });

  try {
    const foundUser = await User.findOne({ username });
    if (!foundUser)
      return res.status(404).json({ message: "Invalid email or password" });

    const isValidPass = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );
    if (!isValidPass)
      return res.status(404).json({ message: "Invalid email or password" });

    const token = Jwt.sign({ _id: foundUser._id }, process.env.KEY, {
      expiresIn: "30d",
    });

    const { password, ...userData } = foundUser._doc;
    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not log in",
    });
  }
};

const getMe = async (req, res) => {
  try {
    const foundUser = await User.findById(req.userId);

    if (!foundUser)
      return res.status(404).json({ message: "Couldn't find user" });

    const { password, ...userData } = foundUser._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error " });
  }
};

module.exports = { handleAuth, getMe };
