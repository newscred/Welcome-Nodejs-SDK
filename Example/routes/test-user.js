const { Router } = require("express");
const { welcomeClient } = require("../config");

const router = Router();

router.get('/getUserById/:userId', async (req, res) => {
  const userId = req.user.id;
  try {
    const toFind = req.params.userId;
    user = await welcomeClient.user.getUserById(toFind, { userId });
    return res.json({ user });
  } catch (err) {
    console.log(err)
    return res.status(err.code || 500).json({ error: err.message });
  }
})

router.get('/getUserByEmail/:email', async (req, res) => {
  const userId = req.user.id;
  try {
    const email = req.params.email;
    user = await welcomeClient.user.getUserByEmail(email, { userId });
    return res.json({ user });
  } catch (err) {
    console.log(err)
    return res.status(err.code || 500).json({ error: err.message });
  }
})

module.exports = router;
