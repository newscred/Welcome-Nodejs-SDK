const { Router } = require("express");
const { welcomeClient, dummyDB } = require("../config");

const router = Router();

router.get("/test-user", async (req, res) => {
  const userId = req.user.id;
  const { id, email } = req.query;
  if (!id && !email) {
    return res
      .status(400)
      .json({ error: "please provide 'id' or 'email' query param" });
  }
  try {
    let user;
    if (id) {
      user = await welcomeClient.user.getUserById(id, { userId });
    } else {
      user = await welcomeClient.user.getUserByEmail(email, { userId });
    }
    return res.json({ user });
  } catch (err) {
    console.log(err)
    return res.status(err.code || 500).json({ error: err.message });
  }
});

module.exports = router;
