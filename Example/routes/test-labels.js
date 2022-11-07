const { Router } = require("express");
const { welcomeClient, dummyDB } = require("../config");

const router = Router();

router.get("/test-label", async (req, res) => {
  const userId = req.user.id;
  try {
    let labelGroupBatch1 = await welcomeClient.label.getLabelGroups(
      {
        pageSize: 3,
      },
      { userId }
    );
    let labelGroupBatch2 = await labelGroupBatch1.getNextBatch();
    let labelGroupBatch3 = labelGroupBatch2
      ? await labelGroupBatch2.getNextBatch()
      : null;
    return res.json({ labelGroupBatch1, labelGroupBatch2, labelGroupBatch3 });
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).json({ error: err.message });
  }
});

module.exports = router;
