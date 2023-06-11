# Sample App

This folder contains an example app that demonstrate how to use the CMP SDK package with an expressjs app.

## How to run
1. Install [ngrok](https://ngrok.com/) and set it up. Then run
```shell
ngrok http 30000
```

2. Go to [Welcome](https://app.welcomesoftware.com/cloud/settings/apps-and-webhooks/apps) and create an app if you don't have one already. Use `<your ngrok url>/tests/oauth/callback` as the redirect url.

3. create a `.env` file, and save the following variables
```
CMP_CLIENT_ID=<your app client id>
CMP_CLIENT_SECRET=<your app client secret>
```

4. Go to the `config.js` file and update the `redirectUri` value to `<your ngrok url>/tests/oauth/callback`.

5. In another terminal, run the following
```
cd Example
npm install
npm start
```

6. Open your browser and go to `localhost:30000` or `<your ngrok url>`. When you test the OAuth module and test a successful authorization, the tokens will be stored in memory (or in the database if you are using one) and used in other module tests.
