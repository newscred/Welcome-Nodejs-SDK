const { Router } = require("express");
const { welcomeClient } = require("../config");

const router = Router();

router.get("/test-campaign-module", async (req, res) => {
  const userId = req.user.id;
  const campaignId = req.query.campaignId;
  if (!campaignId) {
    return res.json({ error: "add a query param 'campaignId'" });
  }
  try {
    const campaign = await welcomeClient.campaign.getCampaignById(campaignId, {
      userId,
    });
    const brief = await welcomeClient.campaign.getCampaignBrief(campaignId, {
      userId,
    });
    return res.json({ campaign, brief });
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).json({ error: err.message });
  }
});

router.get("/test-campaign-object", async (req, res) => {
  const userId = req.user.id;
  const campaignId = req.query.campaignId;
  if (!campaignId) {
    return res.json({ error: "add a query param 'campaignId'" });
  }
  try {
    const campaign = await welcomeClient.campaign.getCampaignById(campaignId, {
      userId,
    });
    const brief = await campaign.getBrief();
    const owner = await campaign.getOwner();
    const parentCampaign = await campaign.getParentCampaign();
    const childCampaigns = await campaign.getChildCampaigns();
    return res.json({ campaign, brief, owner, parentCampaign, childCampaigns });
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).json({ error: err.message });
  }
});

module.exports = router;
