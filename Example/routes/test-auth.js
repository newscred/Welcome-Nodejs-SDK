const { Router } = require("express");
const { welcomeClient } = require("../config");

const router = Router();

router.get("/oauth", (req, res) => {
  return welcomeClient.auth.initiateOAuth((url) => res.redirect(url));
});

router.get("/oauth/callback", async (req, res) => {
  const userId = req.user.id;
  const err = await welcomeClient.auth.handleOAuthCallback(req.query, {
    userId,
  });
  return res.json({ success: !Boolean(err) });
});

router.get("/oauth/refresh-token", async (req, res) => {
  const userId = req.user.id;
  await welcomeClient.auth.rotateTokens({ userId });
  return res.json({ success: true });
});

router.get("/oauth/revoke-access", async (req, res) => {
  const userId = req.user.id;
  await welcomeClient.auth.revokeAccessToken({ userId });
  return res.json({ success: true });
});

router.get("/oauth/revoke-refresh", async (req, res) => {
  const userId = req.user.id;
  await welcomeClient.auth.revokeRefreshToken({ userId });
  return res.json({ success: true });
});

module.exports = router;
