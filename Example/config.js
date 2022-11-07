const { WelcomeClient } = require("welcome-sdk");

const dummyDB = {};

const welcomeClient = new WelcomeClient({
  accessToken: ({ userId }) => dummyDB[userId].accessToken,
  refreshToken: ({ userId }) => dummyDB[userId].refreshToken,
  onAuthFailure: (err) => {
    console.log("authorization failed")
    console.log(err)
    return err
  },
  onAuthSuccess: (accessToken, refreshToken, { userId }) => {
    dummyDB[userId] = { accessToken, refreshToken };
    console.log("authorization successful");
    console.log(JSON.stringify(dummyDB))
    return null
  },
  redirectUri: "https://910c-59-153-103-30.in.ngrok.io/oauth/callback",
  tokenChangeCallback: (accessToken, refreshToken, { userId }) => {
    dummyDB[userId].accessToken = accessToken;
    dummyDB[userId].refreshToken = refreshToken;
    console.log("token updated");
    console.log(JSON.stringify(dummyDB));
  },
  enableAutoRetry: true,
});

module.exports = { welcomeClient, dummyDB };
