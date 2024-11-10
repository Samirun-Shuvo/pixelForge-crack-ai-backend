const { ObjectId } = require("mongodb");
const { db } = require("../utils/connectdb");
const getImgData = require("../utils/getImageData");
const getImageUrl = require("../utils/getImageUrl");
const generateReply = require("../utils/generateReply");

const paintingCollection = db.collection("paintings");


const getAllPaintings = async (req, res) => {
  const result = await paintingCollection.find().toArray();
  res.send(result);
};

const singleImageDetail = async (req, res) => {
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  const result = await paintingCollection.findOne(query);
  res.send(result);
};

const singleImageDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const result = await paintingCollection.deleteOne(query);
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Image deleted successfully",status: "success"});
    } else {
      res.status(404).json({ message: "Image not found" });
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Failed to delete image", error });
  }
};

const generatePaint = async (req, res) => {
  const { prompt, email, category, type } = req.body;
  const promptFinal = `Generate a beautiful ${type} ${category} painting about {prompt}`;
  const buffer = await getImgData(promptFinal);
  const imageData = await getImageUrl(buffer, prompt);

  const data = {
    title: imageData?.data?.title,
    prompt: prompt,
    email,
    category,
    type,
    thumb: imageData?.data?.thumb?.url,
    url: imageData?.data?.url,
    medium: imageData?.data?.medium?.url,
    detail: prompt,
    date: new Date(),
  };
  const result = await paintingCollection.insertOne(data);
  res.send(result);
};

const generateReplies = async (req, res) => {
  const message = req.body.message;
  try {
    const reply = await generateReply(message);
    res.json({ reply });
  } catch (error) {
    console.error("Error generating reply:", error);
    res.status(500).json({ error: "Failed to generate reply" });
  }
};

module.exports = {
  getAllPaintings,
  generatePaint,
  singleImageDetail,
  singleImageDelete,
  generateReplies,
};
