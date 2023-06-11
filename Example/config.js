const { CmpClient } = require("@welcomesoftware/cmp-sdk");

const dummyDB = {};

const cmpClient = new CmpClient({
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
  redirectUri: "<ngrok-url>/tests/oauth/callback",
  tokenChangeCallback: (accessToken, refreshToken, { userId }) => {
    dummyDB[userId].accessToken = accessToken;
    dummyDB[userId].refreshToken = refreshToken;
    console.log("token updated");
    console.log(JSON.stringify(dummyDB));
  },
  enableAutoRetry: true,
});

// Any real database can be used, for example, Redis
// const Redis = require('ioredis');

// const redis = new Redis({
//     host: process.env.REDIS_HOST,
//     port: 12608,
//     password: process.env.REDIS_PASSWORD
// });

// const cmpClient = new CmpClient({
//   accessToken: ({ userId }) => redis.get(`access:${userId}`),
//   refreshToken: ({ userId }) => redis.get(`refresh:${userId}`),
//   onAuthFailure: (err) => {
//     console.log("authorization failed")
//     console.log(err)
//     return err
//   },
//   onAuthSuccess: (accessToken, refreshToken, { userId }) => {
//     redis.set(`access:${userId}`, accessToken)
//     redis.set(`refresh:${userId}`, refreshToken)
//     return null
//   },
//   redirectUri: "<your-app-url>/tests/oauth/callback",
//   tokenChangeCallback: (accessToken, refreshToken, { userId }) => {
//     redis.set(`access:${userId}`, accessToken)
//     redis.set(`refresh:${userId}`, refreshToken)
//     console.log("token updated");
//   },
//   enableAutoRetry: true,
// });

module.exports = { cmpClient, dummyDB };
