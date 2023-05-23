const { Router } = require("express");
const { welcomeClient } = require("../config");

const router = Router();

router.get("/getPublishingEventById/:eventId", async (req, res) => {
  const userId = req.user.id;
  try {
    const eventId = req.params.eventId;
    const publishingEvent =
      await welcomeClient.publishing.getPublishingEventById(eventId, {
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
      await welcomeClient.publishing.getPublishingMetadata(eventId, { userId });
    return res.json({ publishingMetadata });
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).json({ error: err.message });
  }
});

router.post("/AddPublishingMetadata/:eventId", async (req, res) => {
  const userId = req.user.id;
  try {
    const eventId = req.params.eventId;
    const data = await welcomeClient.publishing.AddPublishingMetadata(
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
        await welcomeClient.publishing.getPublishingMetadataForAsset(
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
