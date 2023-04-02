const { Router } = require("express");
const { welcomeClient } = require("../config");

const router = Router();

router.get('/getCampaignById/:campaignId', async(req, res) => {
  const userId = req.user.id;
  try {
    const campaignId = req.params.campaignId;
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

router.get('/getCampaignBrief/:campaignId', async (req, res) => {
  const userId = req.user.id;
  try {
    const campaignId = req.params.campaignId;
    const brief = await welcomeClient.campaign.getCampaignBrief(campaignId, {
      userId,
    });
    return res.json({ brief });
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).json({ error: err.message });
  }
})

module.exports = router;
