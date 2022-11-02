const { Router } = require("express");
const multer = require("multer");
var path = require("path");
const { welcomeClient } = require("../config");

const upload = multer();
const router = Router();

router.get("/test-upload-file", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "upload-test.html"));
});

router.post("/upload", upload.single("file"), async (req, res) => {
  const userId = req.user.id;
  try {
    const uploadedFile = await welcomeClient.uploader.upload(
      req.file.buffer,
      req.file.originalname,
      { userId }
    );
    return res.json({ key: uploadedFile.key, title: upload.title });
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).json({ error: err.message });
  }
});

module.exports = router;
