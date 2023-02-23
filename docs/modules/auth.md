# Auth

The `auth` module handles the OAuth2 authorization of the _Welcome_ app. You first need an Welcome app to use the SDK. If you don't have one already, create one from [here](https://app.welcomesoftware.com/cloud/settings/apps-and-webhooks/apps/create).

The module provides the following methods.

## `initiateOAuth`

**_parameters:_**

- redirectFn: (url: string) => void

**_returns:_** `undefined`

Initializes Welcome authorization flow. This method takes a function that takes a url string as a parameter and can redirect the user to the provided url. Here is an example with an express app,

```js
app.get("/oauth", (req, res) => {
  function redirect(url) {
    res.redirect(url);
  }
  welcomeClient.auth.initiateOAuth(redirect);
});
```

## `handleOAuthCallback`

**_parameters:_**

- query: object
- tokenGetParam: any (optional)

**_returns:_** Promise<ReturnType<`tokenRefreshCallback`> | void>

Handles the redirection callback from Welcome authorization server. This method takes the query object sent by the authorization server as the parameter. Here is an example with an express app,

```js
app.get("/oauth/callback", async (req, res) => {
  await welcomeClient.auth.handleOAuthCallback(req.query);
  return res.send("success");
});
```

## `rotateTokens`

**_parameters:_**

- tokenGetParam: any (optional)

**_returns:_** Promise\<void\>

Updates the access token using the refresh token. Here is an example with an express app,

```js
app.get("token-refresh", async (req, res) => {
  await welcomeClient.auth.rotateTokens();
  return res.send("tokens updated");
});
```

## `revokeAccessToken`

**_parameters:_**

- tokenGetParam: any (optional)

**_returns:_** Promise\<void\>

Sends a request to the authorization server to revoke the access token. Here is an example with an express app,

```js
app.get("revoke-access-token", async (req, res) => {
  await welcomeClient.auth.revokeAccessToken();
  return res.send("access token revoked");
});
```

## `revokeRefreshToken`

**_parameters:_**

- tokenGetParam: any

**_returns:_** Promise\<void\>

Sends a request to the authorization server to revoke the refresh token. Here is an example with an express app,

```js
app.get("revoke-refresh-token", async (req, res) => {
  await welcomeClient.auth.revokeRefreshToken();
  return res.send("refresh token revoked");
});
```

## `getAccessToken`

**_parameters:_**

- tokenGetParam: any

**_returns:_** Promise\<string\>

Gets the current access token saved in your application or database.

## `getRefreshToken`

**_parameters:_**

- tokenGetParam: any

**_returns:_** Promise\<string\>

Gets the current refresh token saved in your application or database.
