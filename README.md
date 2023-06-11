# CMP SDK

CMP-SDK is a nodejs client package to work with [Optimizely CMP](https://www.optimizely.com/products/orchestrate/content-marketing/) (formerly known as _Welcome_) provided Public [REST API Endpoints](https://developers.welcomesoftware.com).

## Getting started

The package is available on npm registry. You can install the package with the `npm install` command,

```bash
npm install @welcomesoftware/cmp-sdk
```


In your project, import the `CmpClient` class from the '@welcomesoftware/cmp-sdk' package.

```javascript
import { CmpClient } from "@welcomesoftware/cmp-sdk";
```

## Initializing the App

```javascript
const cmpClient = new CmpClient(param);
```

`param` is an object with the following properties

- `accessToken`
  \
   _type_: `string` or `Function` (function interface:`(tokenGetParam: any) => string | Promise<string>`)
  \
   Value of the access token to be used or a function that returns an access token. The optional `tokenGetParam` parameter can be a `string`, `object` or a `function` that the function may need to fetch the access token (more on this later)

- `refreshToken`
  \
  _type_: `string` or `Function` (function interface:`(tokenGetParam: any) => string | Promise<string>`)
  \
  Value of the refresh token to be used or a function that returns a refresh token. The optional `tokenGetParam` parameter can be a `string`, `object` or a `function` that the function may need to fetch the refresh token (more on this later)

- `clientId`
  \
   _type_: `string`
  \
  The client Id of the app registered in Optimizely CMP. If you omit this field, the app will try to extract the value from `CMP_CLIENT_ID` environment variable

- `clientSecret`
  \
  _type_: `string`
  \
  The client secret of the app registered in Optimizely CMP. If you omit this field, the app will try to extract the value from `CMP_CLIENT_SECRET` environment variable

- `redirectUri`
  \
  _type_: `string`
  \
  The redirect URI registered in Optimizely CMP with the associated app

- `enableAutoRetry`
  \
   _type_: `boolean`
  \
  If `true` the app will try to update the access token using the refresh token if any api call encounters `401 Unauthorized` error and retry again. If the second retry also fails, the app will raise an error.
  \
  Default: `false`

- `onAuthSuccess`
  \
   _type_: `Function` (interface:`(accessToken: string, refreshToken: string, tokenGetParam: any) => any`)
  \
  This function will be called when authorization code flow completes successfully. You can omit this field if you handle oauth callback manually.

- `onAuthFailure`
  \
   _type_: `Function` (interface: `(error: string) => any`)
  \
  This function will be called if authorization server redirects to redirect URL with any error. You can omit this field if you handle oauth callback manually

- `tokenChangeCallback`
  \
   _type_: `Function` (interface:`(accessToken: string, refreshToken: string, tokenGetParam: any) => any`)
  \
  This function will be called when the app updates the current tokens. You can use this function to store the updated access and refresh tokens in your database. The optional third parameter `tokenGetParam` can be a `string`, `object`, `function` or anything that your function may need.

**tokenGetParam** : Above and throughout the document, you can see a parameter named `tokenGetParam`. If you use functions as the `accessToken` and/or `refreshToken` properties, and if any parameter is required for those functions to work, then the `tokenGetParam` parameter is needed to be paased. You can only ignore this optional parameter, if your token getter functions do not require any parameter.

Here is a full example of using the sdk in an express application,

```javascript
import express from "express";
import { CmpClient } from "@welcomesoftware/cmp-sdk";

const app = express();
const dummyDB = {
  accessToken: "",
  refreshToken: "",
};

const cmpClient = new CmpClient({
  accessToken: () => dummyDB.accessToken,
  refreshToken: () => dummyDB.refreshToken,
  onAuthFailure: (err) => {
    console.log("authorization failed with error " + err);
    throw new Error(err);
  },
  onAuthSuccess: (accessToken, refreshToken) => {
    dummyDB = { accessToken, refreshToken };
    console.log("authorization successful");
  },
  tokenChangeCallback: (accessToken, refreshToken) => {
    dummyDB.accessToken = accessToken;
    dummyDB.refreshToken = refreshToken;
    console.log("token updated");
  },
  redirectUri: "https://www.example.com/optimizely-cmp/oauth/callback", // assuming, your server is hosted on www.example.com
  enableAutoRetry: true,
});


// handling Optimizely CMP app authorization with the SDK
app.get("/optimizely-cmp/oauth", (req, res) => {
  cmpClient.auth.initiateOAuth((url) => res.redirect(url));
});

app.get("/optimizely-cmp/oauth/callback", async (req, res) => {
  try {
    await cmpClient.auth.handleOAuthCallback(req.query);
    return res.send("success");
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// accessing resources on Optimizely CMP with the SDK
app.get("/optimizely-cmp/assets", async (req, res) => {
  const cmpAssets = await cmpClient.library.getAssets();
  return res.json({ cmpAssets });
});

app.listen(process.env.PORT);
```

Learn more about using the SDK in the full [API Reference](./docs)

- [Modules](docs/modules/README.md)
- [Objects](docs/objects/README.md)
- [Errors](docs/errors/README.md)

## About <img src="docs/experimental-badge.svg" alt="experimental-badge" /> badge

In the detailed documents, you may see some of the methods have an <img src="docs/experimental-badge.svg" alt="experimental-badge" /> badge. These methods are based on experimental APIs. Experimental APIs provide early access to APIs that are currently under development. The documentation may highlight new features, new data properties and data models, new filters, and other features specific to the new API. Our intention in providing you with early access to the documentation for these APIs in the experimental stage is that you may plan for implementing them in the near future and provide us with necessary feedback to meet your needs. These APIs are most often NOT operational and the documentation is subject to change frequently from the time the documentation is available to the time the APIs are fully released. Experimental APIs will generally require testing and development on your own applications before relying on them in your stable production environments


## Example App

See the [Example](./Example/) folder for a full demo.
