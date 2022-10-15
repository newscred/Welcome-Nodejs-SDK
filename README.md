# Welcome Nodejs SDK

Table of contents
* [Getting started](#getting-started)
* [Initializaing App](#initializing-the-app)
* [Modules](#modules)
    * [Auth](#auth)
    * [Uploader](#uploader)
    * [Library](#library)
    * [Label](#label)
    * [Task](#task)
    * [Campaign](#campaign)
    * [User](#user)
* [Objects](#objects)
    * [ArticleAsset](#articleasset)
    * [Asset](#asset)
    * [Attachment](#attachment)
    * [Campaign](#campaign-1)
    * [CampaignBrief](#campaignbrief)
    * [Comment](#comment)
    * [ExternalWork](#externalwork)
    * [Folder](#folder)
    * [ImageAsset](#imageasset)
    * [LabelGroup](#labelgroup)
    * [RawFileAsset](#rawfileasset)
    * [Task](#task-1)
    * [TaskAsset](#taskasset)
    * [TaskBrief](#taskbrief)
    * [TaskSubStep](#tasksubstep)
    * [UploadedFile](#uploadedfile)
    * [User](#user-1)
    * [VideoAsset](#videoasset)


## Getting started
This package is not available in `npm` yet. To test this project, you have to build it locally.

To build this locally,

```bash
git clone git@github.com:AhsanShihab/Welcome-Nodejs-SDK.git
cd Welcome-Nodejs-SDK
npm install
npm run build
mv lib <your-project-directory>/welcome-sdk
```

Then import the `WelcomeClient` class from the copied folder.

```javascript
import { WelcomeClient } from './welcome-sdk';
```

## Initializing the App

```javascript
const app = new WelcomeClient(param)
```
`param` is an object with the following properties

| Property | type | description
| -------- | ---- | ----------- 
| `accessToken` | `string` \|<br/> `((tokenGetParam: any) => string \| Promise<string>)` | Value of the access token to be used or a function that returns an access token. The optional `tokenGetParam` parameter can be a `string`, `object` or a `function` that the function may need to fetch the access token
| `refreshToken` | `string` \|<br/> `((tokenGetParam: any) => string \| Promise<string>)` | Value of the refresh token to be used or a function that returns a refresh token. The optional `tokenGetParam` parameter can be a `string`, `object` or a `function` that the function may need to fetch the refresh token
| `clientId` | `string` | The client Id of the app registered in Welcome. If you omit this field, the app will try to extract the value from `WELCOME_CLIENT_ID` environment variable
| `clientSecret` | `string` | The client secret of the app registered in Welcome. If you omit this field, the app will try to extract the value from `WELCOME_CLIENT_SECRET` environment variable 
| `redirectUri` | `string` | The redirect uri registered in Welcome with the associated app
| `enableAutoRetry` | `boolean` | If `true` the app will try to update the accessToken using the provided refreshtoken if any api call encounters `401 Unauthorized` error and retry again. If second retry also fails, the app will raise an error. <br />Default: `false`
| `onAuthSuccess` | `(accessToken: string, refreshToken: string, tokenGetParam: any) => any` | This function will be called when authorization code flow completes successfully. You can omit this field if you handle oauth callback manually.
| `onAuthFailure` | `(accessToken: string, refreshToken: string) => any` | This function will be called if authorization server redirects to redirect URL with any error. You can omit this field if you handle oauth callback manually
| `tokenChangeCallback` | `(accessToken: string, refreshToken: string, tokenGetParam: any) => any` | This function will be called when the app updates the current tokens. You can use this function to store the updated access and refresh tokens in your database. The optional third parameter `tokenGetParam` can be a `string`, `object` or a `function` that the function may need to map the access and refresh token according to your app's requirement

The `tokenGetParam` should be of the same type throughout the app.
## Modules
The initialized `app` object has several modules and each module has their own methods. All methods are asynchronous unless specifically mentioned to be synchronous. The module methods are described below.
### Auth
The `auth` module provides the following methods

| method | parameter | return resolves | description
| ------ | --------- | ----------- | ------------
| `initiateOAuth` <br /> (synchronous function) | `redirectFn: (url) => void` | `undefined` | Use this method to initialize Welcome authorization flow. This method takes a function that take a url string as a parameter and can redirect the user to the provided url (see the example below)
| `handleOAuthCallback` | `query: object`, <br/> `tokenGetParam: any` | returned object from `tokenRefreshCallback` function call if provided else `undefined` | Use this method to handle the redirection callback from Welcome authorization server. This method takes the query object sent by the authorization server as the parameter (see the example below)
| `rotateTokens` | `tokenGetParam: any` | `undefined` |Updates the access token using the refresh token
| `revokeAccessToken` | `tokenGetParam: any` | `undefined` | Sends a request to the authorization server to revoke the access token
| `revokeRefreshToken` | `tokenGetParam: any` | `undefined` | Sends a request to the authorization server to revoke the refresh token


An example of integrating with an express app.
```javascript

import express from 'express';
import { WelcomeClient } from 'welcome-sdk';

const server = express()
const app = new WelcomeClient(param)

server.get('welcome/oauth', (req, res) => {
    app.auth.initiateOAuth((url) => res.redirect(url))
})

server.get('welcome/oauth/callback', async (req, res) => {
    try {
        await app.auth.handleOAuthCallback(req.query)
        return res.send('success')
    } catch (err) {
        return res.status(err.code).json({ message: err.message })
    }
})

server.listen(process.env.PORT)

```

### Uploader
The `uploader` module provides the following methods

| method | parameter | return resolves | description
| ------ | --------- | ----------- | ------------
| `upload` | `name: string`, <br/> `file: FiledBlob` | [UploadedFile](#uploadedfile) | This method takes a string value as the first parameter that is to be the name of the uploaded file and the file object that is to be uploaded. It returns an instance of [UploadedFile](#uploadedfile)

Example
```javascript
const uploadedFile = app.uploader.upload('Shiny sky.jpg', file)
// uploadedFile.create_asset()
// uploadedFile.addAsVersion('assetId')
// uploadedFile.addAsTaskAsset('taskId')
// uploadedFile.addAsTaskAssetDraft('taskId', 'assetId')
```

### Library
The `library` module provides the following methods
| method | parameter | return resolves | description
| ------ | --------- | ----------- | ------------
| `getAssets` | - | array of [Asset](#asset) | This method is used to list all the assets in the library
| `getFolders` | - | array of [Folder](#folder) | This method is used to list all the folders in the library
| `getFolderById` | `folderId: string` | [Folder](#folder) | This method is used to get a folder by its id. The first parameter is the id of the folder.
| `getArticleById` | `articleId: string` | [ArticleAsset](#articleasset) | This method is used to get an article by its id. The first parameter is the id of the article.
| `getImageById` | `imageId: string` | [ImageAsset](#imageasset) | This method is used to get an image by its id. The first parameter is the id of the image.
| `updateImageById` | `imageId: string`, <br/>`update: object` | [ImageAsset](#imageasset) | This method is used to update an image. The first parameter of this method is the id of the image to be updated and the second parameter is an object with properties that are to be updated. The `update` object can have the following properties, (all are optional). <br/> `title`: `string` <br /> `isPublic`: `boolean` <br/> `expiresAt`: `string` \| `null` <br/> `labels`: `Array<{group: string, values: Array<string>}>`
| `deleteImageById` | `imageId: string` | `undefined` | This method is used to delete an image. The first parameter is the id of the image to be deleted
| `getVideoById` | `videoId: string` | [VideoAsset](#videoasset) | This method is used to get a video by its id. The first parameter is the id of the video.
| `updateVideoId` | `videoId: string` | [VideoAsset](#videoasset) | This method is used to update a video. The first parameter of this method is the id of the video to be updated and the second parameter is an object with properties that are to be updated. The `update` object can have the following properties, (all are optional). <br/> `title`: `string` <br /> `isPublic`: `boolean` <br/> `expiresAt`: `string` \| `null` <br/> `labels`: `Array<{group: string, values: Array<string>}>`
| `deleteVideoById` | `videoId: string` | `undefined` | This method is used to delete a video. The first parameter is the id of the video to be deleted
| `getRawFileById` | `rawFileId: string` | [RawFileAsset](#rawfileasset) | This method is used to get a raw-file by its id. The first parameter is the id of the raw-file.
| `updateRawFileById` | `rawFileId: string` | [RawFileAsset](#rawfileasset) | This method is used to update a raw-file. The first parameter of this method is the id of the raw-file to be updated and the second parameter is an object with properties that are to be updated. The `update` object can have the following properties, (all are optional). <br/> `title`: `string` <br /> `isPublic`: `boolean` <br/> `expiresAt`: `string` \| `null` <br/> `labels`: `Array<{group: string, values: Array<string>}>`
| `deleteRawFileById` | `rawFileId: string` | `undefined` | This method is used to delete a raw-file. The first parameter is the id of the raw-file to be deleted


### Label
The `label` module provides the following methods
| method | parameter | return resolves | description
| ------ | --------- | ----------- | ------------
| `getLabelGroups` | - | array of LabelGroup | 


### Task
TODO

### Campaign
The `campaign` module provides the following methods
| method | parameter | return resolves | description
| ------ | --------- | ----------- | ------------
| `getCampaignById` | `campaignId: string` | [Campaign](#campaign-1) | This method is used to get a campaign by its id. The first parameter of this method is the id of the campaign.
| `getCampaignBrief` | `campaignId: string` | [CampaignBrief](#campaignbrief)| This method is used to get the brief of a specific campaign. The first parameter of this method is the id of the campaign.

### User
The `user` module provides the following methods
| method | parameter | return resolves | description
| ------ | --------- | ----------- | ------------
| `getUserById` | `userId: string` | [User](#user-1) |
| `getUserByEmail` | `email: string` | [User](#user-1) |


## Objects
All the objects have the properties similar to the related response model in [Welcome Open API documentation](https://developers.welcomesoftware.com/openapi.html). The properties are in 'camelCase' following the convention of JavaScript. In addition to these properties, some objects also have additional methods.
### ArticleAsset
TODO
### Asset
TODO
### Attachment
TODO
### Campaign
| method | parameter | return resolves | description
| ------ | --------- | ----------- | ------------
| `getBrief` | - | [CampaignBrief](#campaignbrief) \| `null` | Returns a promise that resolves to the campaign brief if it exists, else resolves to null.
| `getOwner` | - | [User](#user-1) \| `null` | Returns a promise that resolves to the owner user object or null if the campaign has no owner
| `getChildCampaigns` | - | Array<[Campaign](#campaign-1)> | Returns a promise that resolves to a list of child campaigns or an empty list if the campaign has no child campaign.
| `getParentCampaign` | - | [Campaign](#campaign-1) \| `null` | Returns a promise that resolves to the parent campaign object or null if the campaign has no parent campaign

### CampaignBrief
| method | parameter | return resolves | description
| ------ | --------- | ----------- | ------------
| `getCampaign` | - | [Campaign](#campaign-1) | Returns a promise that resolves the campaign object for this brief 
### Comment
TODO
### ExternalWork
TODO
### Folder
TODO
### ImageAsset
TODO
### LabelGroup
TODO
### RawFileAsset
TODO
### Task
TODO
### TaskAsset
TODO
### TaskBrief
TODO
### TaskSubStep
TODO
### UploadedFile
TODO
### User
`User` object does not have any additional method.
### VideoAsset
TODO