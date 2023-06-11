const { Router } = require("express");
const multer = require("multer");
const { cmpClient } = require("../config");

const router = Router();
const upload = multer();

router.get("/getFolders", async (req, res) => {
  const userId = req.user.id;
  try {
    let folderBatch1 = await cmpClient.library.getFolders(
      {
        pageSize: 3,
      },
      { userId }
    );
    let folderBatch2 = await folderBatch1.getNextBatch();
    let folderBatch3 = folderBatch2 ? await folderBatch2.getNextBatch() : null;
    return res.json({ folderBatch1, folderBatch2, folderBatch3 });
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).json({ error: err.message });
  }
});

router.get("/getFolderById/:folderId", async (req, res) => {
  const userId = req.user.id;
  try {
    const folderId = req.params.folderId;
    const folder = await cmpClient.library.getFolderById(folderId, {
      userId,
    });
    const parentFolder = await folder.getParentFolder();
    const childFolders = await folder.getChildFolders();
    return res.json({ folder, parentFolder, childFolders });
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).json({ error: err.message });
  }
});

router.get("/getAssets", async (req, res) => {
  const userId = req.user.id;
  try {
    const batch1 = await cmpClient.library.getAssets(
      { pageSize: 3 },
      { userId }
    );
    const batch2 = await batch1.getNextBatch();
    return res.json({ batch1, batch2 });
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).json({ error: err.message });
  }
});

router.post("/addAsset", upload.single("file"), async (req, res) => {
  const userId = req.user.id;
  try {
    const uploadedFile = await cmpClient.uploader.upload(
      req.file.buffer,
      req.file.originalname,
      { userId }
    );
    const asset = await cmpClient.library.addAsset(uploadedFile, {
      userId,
    });
    return res.json({ asset, relatedLinks: asset.getRelatedLinks() });
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).json({ error: err.message });
  }
});

router.post(
  "/addAssetVersion/:assetId",
  upload.single("file"),
  async (req, res) => {
    const userId = req.user.id;
    try {
      const assetId = req.params.assetId;
      const uploadedFile = await cmpClient.uploader.upload(
        req.file.buffer,
        req.file.originalname,
        { userId }
      );
      const assetVersion = await cmpClient.library.addAssetVersion(
        assetId,
        uploadedFile,
        { userId }
      );
      return res.json({
        assetVersion,
        relatedLinks: assetVersion.getRelatedLinks(),
      });
    } catch (err) {
      console.log(err);
      return res.status(err.code || 500).json({ error: err.message });
    }
  }
);

router.get("/getArticle/:articleId", async (req, res) => {
  const userId = req.user.id;
  try {
    const articleId = req.params.articleId;
    const article = await cmpClient.library.getArticle(articleId, {
      userId,
    });
    return res.json({ article });
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).json({ error: err.message });
  }
});

router.get("/getImage/:imageId", async (req, res) => {
  const userId = req.user.id;
  try {
    const imageId = req.params.imageId;
    const image = await cmpClient.library.getImage(imageId, { userId });
    return res.json({ image });
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).json({ error: err.message });
  }
});

router.patch("/updateImage/:imageId", async (req, res) => {
  const userId = req.user.id;
  try {
    const imageId = req.params.imageId;
    const updatePayload = req.body;
    const updatedImage = await cmpClient.library.updateImage(
      imageId,
      updatePayload,
      { userId }
    );
    return res.json({ updatedImage });
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).json({ error: err.message });
  }
});

router.delete("/deleteImage/:imageId", async (req, res) => {
  const userId = req.user.id;
  try {
    const imageId = req.params.imageId;
    await cmpClient.library.deleteImage(imageId, { userId });
    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).json({ error: err.message });
  }
});

router.get("/getVideo/:videoId", async (req, res) => {
  const userId = req.user.id;
  try {
    const videoId = req.params.videoId;
    const video = await cmpClient.library.getVideo(videoId, { userId });
    return res.json({ video });
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).json({ error: err.message });
  }
});

router.patch("/updateVideo/:videoId", async (req, res) => {
  const userId = req.user.id;
  try {
    const videoId = req.params.videoId;
    const updatePayload = req.body;
    const updatedVideo = await cmpClient.library.updateVideo(videoId, updatePayload, {
      userId,
    });
    return res.json({ updatedVideo });
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).json({ error: err.message });
  }
});

router.delete("/deleteVideo/:videoId", async (req, res) => {
  const userId = req.user.id;
  try {
    const videoId = req.params.videoId;
    await cmpClient.library.deleteVideo(videoId, { userId });
    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).json({ error: err.message });
  }
});

router.get("/getRawFile/:rawFileId", async (req, res) => {
  const userId = req.user.id;
  try {
    const rawFileId = req.params.rawFileId;
    const rawFile = await cmpClient.library.getRawFile(rawFileId, {
      userId,
    });
    return res.json({ rawFile });
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).json({ error: err.message });
  }
});

router.patch("/updateRawFile/:rawFileId", async (req, res) => {
  const userId = req.user.id;
  try {
    const rawFileId = req.params.rawFileId;
    const updatePayload = req.body;
    const updatedRawFile = await cmpClient.library.updateRawFile(
      rawFileId,
      updatePayload,
      { userId }
    );
    return res.json({ updatedRawFile });
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).json({ error: err.message });
  }
});

router.delete("/deleteRawFile/:rawFileId", async (req, res) => {
  const userId = req.user.id;
  try {
    const rawFileId = req.params.rawFileId;
    await cmpClient.library.deleteRawFile(rawFileId, { userId });
    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).json({ error: err.message });
  }
});

module.exports = router;
