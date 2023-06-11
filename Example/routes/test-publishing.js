const { Router } = require("express");
const { cmpClient } = require("../config");

const router = Router();

router.get("/getPublishingEventById/:eventId", async (req, res) => {
  const userId = req.user.id;
  try {
    const eventId = req.params.eventId;
    const publishingEvent =
      await cmpClient.publishing.getPublishingEventById(eventId, {
        userId,
      });
    return res.json({ publishingEvent });
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).json({ error: err.message });
  }
});

router.get("/getPublishingMetadata/:eventId", async (req, res) => {
  const userId = req.user.id;
  try {
    const eventId = req.params.eventId;
    const publishingMetadata =
      await cmpClient.publishing.getPublishingMetadata(eventId, { userId });
    return res.json({ publishingMetadata });
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).json({ error: err.message });
  }
});

router.post("/addPublishingMetadata/:eventId", async (req, res) => {
  const userId = req.user.id;
  try {
    const eventId = req.params.eventId;
    const data = await cmpClient.publishing.addPublishingMetadata(
      eventId,
      req.body,
      { userId }
    );
    return res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).json({ error: err.message });
  }
});

router.get(
  "/getPublishingMetadataForAsset/:eventId/:assetId/:metadataId",
  async (req, res) => {
    const userId = req.user.id;
    try {
      const { eventId, assetId, metadataId } = req.params;
      const publishingMetadataForAsset =
        await cmpClient.publishing.getPublishingMetadataForAsset(
          eventId,
          assetId,
          metadataId,
          { userId }
        );
      return res.json({ publishingMetadataForAsset });
    } catch (err) {
      console.log(err);
      return res.status(err.code || 500).json({ error: err.message });
    }
  }
);

module.exports = router;
