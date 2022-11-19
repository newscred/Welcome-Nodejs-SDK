const { Router } = require("express");
const multer = require("multer");
var path = require("path");
const { welcomeClient } = require("../config");

const upload = multer();
const router = Router();


router.post("/upload", upload.single("file"), async (req, res) => {
  const userId = req.user.id;
  try {
    const uploadedFile = await welcomeClient.uploader.upload(
      req.file.buffer,
      req.file.originalname,
      { userId }
    );
    return res.json({ uploadedFile });
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).json({ error: err.message });
  }
});

module.exports = router;
