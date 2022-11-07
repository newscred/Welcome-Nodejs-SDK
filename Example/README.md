# Sample App

This folder contains an example app that demonstrate how to use the Welcome NodeJS SDK with an expressjs app.

## How to run
1. Install [ngrok](https://ngrok.com/) and set it up. Then run
```shell
ngrok http 5000
```

2. Go to [Welcome](https://app.welcomesoftware.com/cloud/settings/apps-and-webhooks/apps) and create an app if you don't have one already. Use `<your ngrok url>/oauth/callback` as the redirect url.

3. create a `.env` file, and save the following variables
```
WELCOME_CLIENT_ID=<your app client id>
WELCOME_CLIENT_SECRET=<your app client secret>
```

4. Go to the `config.js` file and update the `redirectUri` value to `<your ngrok url>/oauth/callback`.

5. In another terminal, run the following
```
cd Example
npm run build
npm run
```

Go to http://localhost:5000 or `<your ngrok url>` in your browser, click `Test OAuth`. When the authorization is successful, the tokens will be logged in the console and stored in memory.


## Test endpoints

### auth

GET /oauth

GET /oauth/refresh-token

GET /oauth/revoke-access

GET /oauth/revoke-refresh

### upload

GET /test-upload-file (UI)

POST /upload

### label

GET /test-label

### campaign

GET /test-campaign-module?campaignId=

GET /test-campaign-object?campaignId=

### user

GET /test-user?id=<user id>

GET /test-user?email=<user email>
