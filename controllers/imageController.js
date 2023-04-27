const Image = require("../model/Image");

const createImage = async (req, res) => {
  const file = req.body.file;
  try {
    const foundImage = await Image.find({ userId: req.userId });
    if (foundImage) {
      await Image.findOneAndDelete({ userId: req.userId });
    }

    const createdImage = await Image.create({
      file: file,
      userId: req.userId
    });

    res.status(201).json({ message: "Image created" });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

const getImage = async (req, res) => {
  try {
    const foundImage = await Image.find({ userId: req.userId });

    res.json(foundImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createImage,
  getImage
};