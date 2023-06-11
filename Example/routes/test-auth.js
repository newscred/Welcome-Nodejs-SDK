const { Router } = require("express");
const { cmpClient } = require("../config");

const router = Router();

router.get("/initiateOAuth", (req, res) => {
  return cmpClient.auth.initiateOAuth((url) => res.redirect(url));
});

router.get("/callback", async (req, res) => {
  const userId = req.user.id;
  const err = await cmpClient.auth.handleOAuthCallback(req.query, {
    userId,
  });
  res.redirect('/oauth');
});

router.get("/access-token", async (req, res) => {
  const userId = req.user.id;
  const accessToken = await cmpClient.auth.getAccessToken({ userId });
  console.log(accessToken)
  return res.json({ accessToken });
});

router.get("/refresh-token", async (req, res) => {
  const userId = req.user.id;
  const refreshToken = await cmpClient.auth.getRefreshToken({ userId });
  return res.json({ refreshToken });
})

router.get("/rotate-token", async (req, res) => {
  const userId = req.user.id;
  await cmpClient.auth.rotateTokens({ userId });
  return res.json({ success: true });
});

router.get("/revoke-access", async (req, res) => {
  const userId = req.user.id;
  await cmpClient.auth.revokeAccessToken({ userId });
  return res.json({ success: true });
});

router.get("/revoke-refresh", async (req, res) => {
  const userId = req.user.id;
  await cmpClient.auth.revokeRefreshToken({ userId });
  return res.json({ success: true });
});

module.exports = router;
