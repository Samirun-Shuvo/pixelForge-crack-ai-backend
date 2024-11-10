const express = require("express");
const {
  generatePaint,
  singleImageDetail,
  getAllPaintings,
  generateReplies,
  singleImageDelete,
} = require("../controllers/paintings.controller");
const router = express.Router();

router.get("/", getAllPaintings);
router.get("/:id", singleImageDetail);
router.delete("/:id", singleImageDelete);
router.post("/generate", generatePaint);
router.post("/replies", generateReplies);

module.exports = router;
