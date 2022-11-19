const { Router } = require("express");
const { welcomeClient } = require("../config");

const router = Router();

router.get("/initiateOAuth", (req, res) => {
  return welcomeClient.auth.initiateOAuth((url) => res.redirect(url));
});

router.get("/callback", async (req, res) => {
  const userId = req.user.id;
  const err = await welcomeClient.auth.handleOAuthCallback(req.query, {
    userId,
  });
  res.redirect('/oauth');
});

router.get("/access-token", async (req, res) => {
  const userId = req.user.id;
  const accessToken = await welcomeClient.auth.getAccessToken({ userId });
  console.log(accessToken)
  return res.json({ accessToken });
});

router.get("/refresh-token", async (req, res) => {
  const userId = req.user.id;
  const refreshToken = await welcomeClient.auth.getRefreshToken({ userId });
  return res.json({ refreshToken });
})

router.get("/rotate-token", async (req, res) => {
  const userId = req.user.id;
  await welcomeClient.auth.rotateTokens({ userId });
  return res.json({ success: true });
});

router.get("/revoke-access", async (req, res) => {
  const userId = req.user.id;
  await welcomeClient.auth.revokeAccessToken({ userId });
  return res.json({ success: true });
});

router.get("/revoke-refresh", async (req, res) => {
  const userId = req.user.id;
  await welcomeClient.auth.revokeRefreshToken({ userId });
  return res.json({ success: true });
});

module.exports = router;
