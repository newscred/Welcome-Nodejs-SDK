# Welcome Nodejs SDK

Table of contents

- [Getting started](#getting-started)
- [Initializaing App](#initializing-the-app)
- [Modules](#modules)
  - [Auth](#auth)
  - [Campaign](#campaign)
  - [Label](#label)
  - [Library](#library)
  - [Task](#task)
  - [Uploader](#uploader)
  - [User](#user)
- [Objects](#objects)

## Getting started

This package is not available in `npm` yet. To test this project, you have to build it locally.

To build this locally,

```
git clone git@github.com:AhsanShihab/Welcome-Nodejs-SDK.git
cd Welcome-Nodejs-SDK
npm install
npm run build
mv lib <your-project-directory>/node_modules/welcome-sdk
cd <your-project-directory>
npm install form-data
```

Then import the `WelcomeClient` class from the 'welcome-sdk' package.

```javascript
import { WelcomeClient } from "welcome-sdk";
```

## Initializing the App

```javascript
const welcomeClient = new WelcomeClient(param);
```

`param` is an object with the following properties

| Property              | type                                                                     | description                                                                                                                                                                                                                                                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `accessToken`         | `string` \|<br/> `((tokenGetParam: any) => string \| Promise<string>)`   | Value of the access token to be used or a function that returns an access token. The optional `tokenGetParam` parameter can be a `string`, `object` or a `function` that the function may need to fetch the access token                                                                                                                                     |
| `refreshToken`        | `string` \|<br/> `((tokenGetParam: any) => string \| Promise<string>)`   | Value of the refresh token to be used or a function that returns a refresh token. The optional `tokenGetParam` parameter can be a `string`, `object` or a `function` that the function may need to fetch the refresh token                                                                                                                                   |
| `clientId`            | `string`                                                                 | The client Id of the app registered in Welcome. If you omit this field, the app will try to extract the value from `WELCOME_CLIENT_ID` environment variable                                                                                                                                                                                                  |
| `clientSecret`        | `string`                                                                 | The client secret of the app registered in Welcome. If you omit this field, the app will try to extract the value from `WELCOME_CLIENT_SECRET` environment variable                                                                                                                                                                                          |
| `redirectUri`         | `string`                                                                 | The redirect URI registered in Welcome with the associated app                                                                                                                                                                                                                                                                                               |
| `enableAutoRetry`     | `boolean`                                                                | If `true` the app will try to update the access token using the refresh token if any api call encounters `401 Unauthorized` error and retry again. If second retry also fails, the app will raise an error. <br />Default: `false`                                                                                                                           |
| `onAuthSuccess`       | `(accessToken: string, refreshToken: string, tokenGetParam: any) => any` | This function will be called when authorization code flow completes successfully. You can omit this field if you handle oauth callback manually.                                                                                                                                                                                                             |
| `onAuthFailure`       | `(error: string) => any`                                                 | This function will be called if authorization server redirects to redirect URL with any error. You can omit this field if you handle oauth callback manually                                                                                                                                                                                                 |
| `tokenChangeCallback` | `(accessToken: string, refreshToken: string, tokenGetParam: any) => any` | This function will be called when the app updates the current tokens. You can use this function to store the updated access and refresh tokens in your database. The optional third parameter `tokenGetParam` can be a `string`, `object` or a `function` that the function may need to map the access and refresh token according to your app's requirement |

In the following sections, many of the functions will have an optional parameter `tokenGetParam`. If you use functions as the `accessToken` and/or `refreshToken` properties, and if any parameter is required for those functions to work, then you must always pass the `tokenGetParam` parameter. You can only ignore that optional parameter, if your token getter functions do not require any parameter.

## Modules

The initialized object has several modules and each module has their own methods.

### Auth

The `auth` module provides the following methods.

#### `initiateOAuth`

**_parameters:_**

- redirectFn: (url: string) => void

**_returns:_** `undefined`

Initializes Welcome authorization flow. This method takes a function that takes a url string as a parameter and can redirect the user to the provided url (see the example below)

#### `handleOAuthCallback`

**_parameters:_**

- query: object
- tokenGetParam: any (optional)

**_returns:_** Promise<ReturnType<`tokenRefreshCallback`> | void>

Handles the redirection callback from Welcome authorization server. This method takes the query object sent by the authorization server as the parameter (see the example below)

#### `rotateTokens`

**_parameters:_**

- tokenGetParam: any (optional)

**_returns:_** Promise\<void\>

Updates the access token using the refresh token.

#### `revokeAccessToken`

**_parameters:_**

- tokenGetParam: any (optional)

**_returns:_** Promise\<void\>

Sends a request to the authorization server to revoke the access token

#### `revokeRefreshToken`

**_parameters:_**

- tokenGetParam: any

**_returns:_** Promise\<void\>

Sends a request to the authorization server to revoke the refresh token

#### `getAccessToken`

**_parameters:_**

- tokenGetParam: any

**_returns:_** Promise\<string\>

Gets the current access token in the app.

#### `getRefreshToken`

**_parameters:_**

- tokenGetParam: any

**_returns:_** Promise\<string\>

Gets the current refresh token in the app.

**Example**

An example of integrating with an express app.

```javascript
import express from "express";
import { WelcomeClient } from "welcome-sdk";

const app = express();
const welcomeClient = new WelcomeClient(param);

app.get("welcome/oauth", (req, res) => {
  welcomeClient.auth.initiateOAuth((url) => res.redirect(url));
});

app.get("welcome/oauth/callback", async (req, res) => {
  try {
    await welcomeClient.auth.handleOAuthCallback(req.query);
    return res.send("success");
  } catch (err) {
    return res.status(err.code).json({ message: err.message });
  }
});

app.listen(process.env.PORT);
```

---

### Campaign

The `campaign` module provides the following methods.

#### `getCampaignById`

**_parameters:_**

- campaignId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[Campaign](#campaign-1)>

Gets a campaign by its id.

#### `getCampaignBrief`

**_parameters:_**

- campaignId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[CampaignBrief](#campaignbrief)>

Gets the brief of the campaign specified by the id

---

### Label

The `label` module provides the following methods

#### `getLabelGroups`

**_parameters:_**

- filter: object (optional)
- tokenGetParam: any (optional)

**_returns:_** Promise<[LabelGroupList](#labelgrouplist)>

Fetches the available Label groups in your Welcome instance. The first parameter `filter` is an `object` to filter the label groups. The `filter` object can have any of the following properties:

`sourceOrgType`: `'current' | 'related'` <br />
`offset`: `number` <br />
`pageSize`: `number`

---

### Library

The `library` module provides the following methods

#### `getAssets`

**_parameters:_**

- option: object (optional)
- tokenGetParam: any (optional)

**_returns:_** Promise<[LibraryAssetList](#libraryassetlist)>

Fetches the assets in library. The first parameter `option` is an `object` to filter the assets. The `option` object can have any of the following properties:

`type`: (one of: `article`, `image`, `video`, `raw_file`, `structured_content`)[] <br/>
`createdAt_From`: `string`<br/>
`createdAt_To`: `string`<br/>
`modifiedAt_From`: `string`<br/>
`modifiedAt_To`: `string`<br/>
`folderId`: `string`<br/>
`includeSubfolderAssets`: `boolean`<br/>
`offset`: `number` <br />
`pageSize`: `number`<br/>

#### `addAsset`

**_parameters:_**

- uploadedFile: [UploadedFile](#uploadedfile)
- tokenGetParam: any (optional)

**_returns:_** Promise<[LibraryAsset](#libraryasset)>

Adds a new asset to the library.

#### `addAssetVersion`

**_parameters:_**

- assetId: string
- uploadedFile: [UploadedFile](#uploadedfile)
- tokenGetParam: any (optional)

**_returns:_** Promise<[LibraryAssetVersion](#libraryassetversion)>

Adds a new version of an asset in the library.

#### `getFolders`

**_parameters:_**

- option: object (optional)
- tokenGetParam: any (optional)

**_returns:_** Promise<[FolderList](#folderlist)>

Fetches the folders in the library. The first parameter `option` is an object which can have any of the following properties:

`parentFolderId`: `string`<br/>
`offset`: `number` <br />
`pageSize`: `number`<br/>

#### `getFolderById`

**_parameters:_**

- folderId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[Folder](#folder)>

Gets the folder with the matching id.

#### `getArticleById`

**_parameters:_**

- articleId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[LibraryArticle](#libraryarticle)>

Gets the article with the matching id.

#### `getImageById`

**_parameters:_**

- imageId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[LibraryImage](#libraryimage)>

Gets the image with the matching id.

#### `updateImageById`

**_parameters:_**

- imageId: string
- update: object
- tokenGetParam: any (optional)

**_returns:_** Promise<[LibraryImage](#libraryimage)>

Updates the details of a library image. The second parameter `update` can have any of the following properties:

`title`: `string` <br/>
`isPublic`: `boolean`<br/>
`expiresAt`: `string` | `null`<br/>
`labels`: `{ group: string, values: string[] }[]` <br/>

#### `deleteImageById`

**_parameters:_**

- imageId: string
- tokenGetParam: any (optional)

**_returns:_** Promise\<void\>

Deletes the image with the matching id from the library.

#### `getVideoById`

**_parameters:_**

- videoId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[LibraryVideo](#libraryvideo)>

Gets the video with the matching id.

#### `updateVideoById`

**_parameters:_**

- videoId: string
- update: object
- tokenGetParam: any (optional)

**_returns:_** Promise<[LibraryVideo](#libraryvideo)>

Updates the details of a library video. The second parameter `update` can have any of the following properties:

`title`: `string` <br/>
`isPublic`: `boolean`<br/>
`expiresAt`: `string` | `null`<br/>
`labels`: `{ group: string, values: string[] }[]` <br/>

#### `deleteVideoById`

**_parameters:_**

- videoId: string
- tokenGetParam: any (optional)

**_returns:_** Promise\<void\>

Deletes the video with the matching id from the library.

#### `getRawFileById`

**_parameters:_**

- rawFileId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[LibraryRawFile](#libraryrawfile)>

Gets the raw file with the matching id.

#### `updateRawFileById`

**_parameters:_**

- rawFileId: string
- update: object
- tokenGetParam: any (optional)

**_returns:_** Promise<[LibraryRawFile](#libraryrawfile)>

Updates the details of a library raw file. The second parameter `update` can have any of the following properties:

`title`: `string` <br/>
`isPublic`: `boolean`<br/>
`expiresAt`: `string` | `null`<br/>
`labels`: `{ group: string, values: string[] }[]` <br/>

#### `deleteRawFileById`

**_parameters:_**

- rawFileId: string
- tokenGetParam: any (optional)

**_returns:_** Promise\<void\>

Deletes the raw file with the matching id from the library.

---

### Task

The `task` module provides the following methods

#### `getTask`

**_parameters:_**

- taskId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[Task](#task-1)>

Gets a task with the matching ID

#### `updateTask`

**_parameters:_**

- taskId: string
- update: object
- tokenGetParam: any

**_returns:_** Promise<[Task](#task-1)>

Updates a task with the matching ID. The second parameter `update` is an object that contains the update payload. The update object can have the following property:

`labels: { group: string, values: string[] }[]`

#### `getTaskBrief`

**_parameters:_**

- taskId: string
- tokenGetParam: any

**_returns:_** Promise<[TaskBrief](#taskbrief)>

Gets the brief of a task with the matching ID.

#### `getTaskCustomFields`

**_parameters:_**

- taskId: string
- option: object (optional)
- tokenGetParam: any (optional)

**_returns:_** Promise<[CustomFieldList](#customfieldlist)>

Gets the custom fields for a task as a [CustomFieldList](#customfieldlist) object. The second parameter `option` can have any of the following properties:

`pazeSize: number; offset: number;`

#### `getTaskCustomField`

**_parameters:_**

- taskId: string
- customFieldId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[CustomField](#customfield)>

Gets the details of the custom field with the matching custom field Id for the task with the matching task ID.

#### `updateTaskCustomField`

**_parameters:_**

- taskId: string
- customFieldId: string
- update: object
- tokenGetParam: any (optional)

**_returns:_** Promise<[CustomField](#customfield)>

Updates the custom field with the matching custom field ID for the task with the matching task ID. The third parameter `update` is the update payload, with can have the following property:

`values: string[]`

#### `getTaskCustomFieldChoices`

**_parameters:_**

- taskId: string
- customFieldId: string
- option: object (optional)
- tokenGetParam: any (optional)

**_returns:_** Promise\<object\>

Gets the aavailable choices for a specific custom field and returns the JSON object received from the server. This function takes an optional `option` object as the third parameter, which can have any of the following properties:

`pageSize: number; offset: number;`

#### `getTaskSubstep`

**_parameters:_**

- taskId: string
- stepId: string
- subStepId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[TaskSubStep](#tasksubstep)>

Gets the details of a task sub-step

#### `updateTaskSubstep`

**_parameters:_**

- taskId: string
- stepId: string
- subStepId: string
- update: object
- tokenGetParam: any (optional)

**_returns:_** Promise<[TaskSubStep](#tasksubstep)>

Updates the substep of the task specified by the task, step and sub-step IDs. The fourth paramer `update` is the update payload that can have only one of the following properties:

`isCompleted: boolean; isInProgress: boolean; assigneeId: string`

#### `getTaskSubstepExternalWork`

**_parameters:_**

- taskId: string
- stepId: string
- subStepId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[ExternalWork](#externalwork)>

Gets the details of the external work if the substep is an external step.

#### `updateTaskSubStepExternalWork`

**_parameters:_**

- taskId: string
- stepId: string
- subStepId: string
- update: object
- tokenGetParam: any (optional)

**_returns:_** Promise<[ExternalWork](#externalwork)>

Updates an external work associated with the sub-step. The fourth parameter `update` is the update payload that can have any of the following properties:

` identifier: string; title: string; status: string; url: string;`

#### `getTaskSubstepComments`

**_parameters:_**

- taskId: string
- stepId: string
- subStepId: string
- option: object (optional)
- tokenGetParam?: any (optional)

**_returns:_** Promise\<object\>

Gets the comments in the specificed sub-step and returns the JSON object received from the server.

#### `addTaskSubstepComment`

**_parameters:_**

- taskId: string
- stepId: string
- subStepId: string
- comment: object
- tokenGetParam?: any (optional)

**_returns:_** Promise\<object\>

Posts a comment to the specified sub-step and returns the JSON object received from the server. The fourth parameter `comment` is an object that has the following properties:

`value: string; attachments: UploadedFile[] (optional);`

#### `getTaskSubstepComment`

**_parameters:_**

- taskId: string
- stepId: string
- subStepId: string
- commentId: string
- tokenGetParam?: any (optional)

**_returns:_** Promise\<object\>

Gets a task sub-step comment by comment ID and returns the JSON object received from the server.

#### `updateTaskSubstepComment`

**_parameters:_**

- taskId: string
- stepId: string
- subStepId: string
- commentId: string
- update: object
- tokenGetParam?: any (optional)

**_returns:_** Promise\<object\>

Updates a task sub-step comment and returns the JSON object received from the server. The fifth parameter `update` is the update payload which has the following property:

`value: string;`

#### `deleteTaskSubstepComment`

**_parameters:_**

- taskId: string
- stepId: string
- subStepId: string
- commentId: string
- tokenGetParam: any (optional)

**_returns:_** Promise\<void\>

Deletes a task sub-step comment

#### `getTaskAssets`

**_parameters:_**

- taskId: string
- option: object
- tokenGetParam: any (optional)

**_returns:_** Promise<[TaskAssetList](#taskassetlist)>

Gets the task asset list and returns it as a [TaskAssetList](#taskassetlist) object. The second parameter `option` object can have any of the following properties:

`pageSize: number; offset: number;`

#### `addTaskAsset`

**_parameters:_**

- taskId: string
- asset: [UploadedFile](#uploadedfile)
- tokenGetParam: any (optional)

**_returns:_** Promise<[TaskAsset](#taskasset)>

Adds a new asset to a task.

#### `addTaskAssetDraft`

**_parameters:_**

- taskId: string
- assetId: string
- draft: UploadedFile
- tokenGetParam: any (optional)

**_returns:_** Promise\<object\>

Adds a new draft to the task asset and returns the JSON object received from the server.

#### `getTaskAssetComments`

**_parameters:_**

- taskId: string
- assetId: string
- option: object (optional)
- tokenGetParam: any (optional)

**_returns:_** Promise\<object\>

Gets the comments for a task asset. The third optional parameter `option` can have any of the following properties:

`pageSize: number; offset: number;`

#### `addTaskAssetComment`

**_parameters:_**

- taskId: string
- assetId: string
- comment: object
- tokenGetParam: any (optional)

**_returns:_** Promise\<object\>

Adds a new comment to a task asset. The third parameter `comment` is an object that has the following properties:

`value: string; attachments: UploadedFile[] (optional);`

#### `getTaskAttachments`

**_parameters:_**

- taskId: string
- option: object (optional)
- tokenGetParam: any (optional)

**_returns:_** Promise<[AttachmentList](#attachmentlist)>

Gets the attachments of a task. The second parameter `option` is an object that can have any of the following properties:

`pageSize: number; offset: number;`

#### `getTaskArticle`

**_parameters:_**

- taskId: string
- articleId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[TaskArticle](#taskarticle)>

Gets the task article

#### `getTaskImage`

**_parameters:_**

- taskId: string
- imageId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[TaskImage](#taskimage)>

Gets the task image

#### `getTaskVideo`

**_parameters:_**

- taskId: string
- videoId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[TaskVideo](#taskvideo)>

Gets the task video

#### `getTaskRawFile`

**_parameters:_**

- taskId: string
- rawFileId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[TaskRawFile](#taskrawfile)>

Gets the task raw file

---

### Uploader

The `uploader` module provides the following methods

#### `upload`

**_parameters:_**

- readStream: ReadableStream
- title: string (optional)
- tokenGetParam: any (optional)

**_returns:_** Promise<[UploadedFile](#uploadedfile)>

Uploads a file to Welcome. It takes a read stream of the file that is to be uploaded as its first parameter. The second parameter is the title of the file which is optional. If omited, the default title will be "(no title)"

**Example**

```javascript
const readStream = fs.createReadStream("myfile.mp4");
const uploadedFile = await app.uploader.upload(readStream);
uploadedFile.title = "My File";
// do something with the uploaded file
// uploadedFile.createAsset()
```

Example with express and multer middleware

```javascript
const welcomeClient = new WelcomeClient(param);
const app = express();
const upload = multer();
app.post("/upload", upload.single("file"), async (req, res) => {
  const uploadedFile = await welcomeClient.uploader.upload(
    req.file.buffer,
    req.file.originalname
  );
  // do something with the uploaded file
  // const asset = await uploadedFile.createAsset();
  return res.json({ success: true });
});
```

---

### User

The `user` module provides the following methods

#### `getUserById`

**_parameters:_**

- userId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[User](#user-1)>

Gets the user by the id

#### `getUserByEmail`

**_parameters:_**

- email: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[User](#user-1)>

Gets the user with the matching email address

---

## Objects

### Attachment

**_properties:_**

| property | type   |
| -------- | ------ |
| id       | string |
| name     | string |
| url      | string |

### AttachmentList

**_properties:_**

| property | type                        |
| -------- | --------------------------- |
| data     | [Attachment](#attachment)[] |

**_methods:_**

#### `getNextBatch`

**_parameteres:_** _(None)_

**_returns:_** Promise<[AttachmentList](#attachmentlist) | null>

#### `getPreviousBatch`

**_parameteres:_** _(None)_

**_returns:_** Promise<[AttachmentList](#attachmentlist) | null>

### Budget

**_properties:_**

| property       | type   |
| -------------- | ------ |
| curencyCode    | string |
| budgetedAmount | string |

### Campaign

**_properties:_**

| property    | type                        |
| ----------- | --------------------------- |
| id          | string                      |
| title       | string                      |
| description | string \| null              |
| startDate   | Date \| null                |
| endDate     | Date \| null                |
| isHidden    | boolean                     |
| referenceId | string                      |
| budget      | [Budget](#budget) \| null   |
| labels      | [Label](#label-1)[] \| null |

**_methods:_**

#### `getBrief`

**_parameteres:_** _(None)_

**_returns:_** Promise<[CampaignBrief](#campaignbrief) | null>

Gets the campaigns brief if it has one.

#### `getOwner`

**_parameteres:_** _(None)_

**_returns:_** Promise<[User](#user-1) | null>

Gets the campaigns owner. If the campaign has no owner, it will return `null` promise.

#### `getChildCampaigns`

**_parameteres:_** _(None)_

**_returns:_** Promise<[Campaign](#campaign-1)[]>

Gets the child campaigns of the campaign.

#### `getParentCampaign`

**_parameteres:_** _(None)_

**_returns:_** Promise<[Campaign](#campaign-1) | null>

Gets the parent campaign of the campaign.

### CampaignBrief

**_properties:_**

| property | type                                 |
| -------- | ------------------------------------ |
| type     | string                               |
| title    | string                               |
| template | { id: string; name: string } \| null |
| fields   | { name; string; value: string }[]    |

**_methods:_**

#### `getCampaign`

**_parameteres:_** _(None)_

**_returns:_** Promise<[Campaign](#campaign-1) >

Gets the campaign the brief is for.

### CustomField

**_properties:_**

| property | type                                                                                                                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id       | string                                                                                                                                                                                     |
| name     | string                                                                                                                                                                                     |
| type     | one of: `"text_field"`, `"multi_line_text_field"`, `"checkboxes"`, `"dropdown"`, `"multi_select_dropdown"`, `"multiple_choice"`, `"date_field"`, `"image"`, `"video"`, `"rich_text_field"` |
| values   | { name; string; value: string }[]                                                                                                                                                          |

**_methods:_**

#### `getChoices`

**_parameters:_**

- option: object

**_returns:_** Promise\<object\>

Gets the possible choices for the field. The `option` parameter is an object which can have any of the following properties,

`pageSize: number; offset: number;`

### CustomFieldList

**_properties:_**

| property | type                          |
| -------- | ----------------------------- |
| data     | [CustomField](#customfield)[] |

**_methods:_**

#### `getNextBatch`

**_parameteres:_** _(None)_

**_returns:_** Promise<[CustomField](#customfield) | null>

#### `getPreviousBatch`

**_parameteres:_** _(None)_

**_returns:_** Promise<[CustomField](#customfield) | null>

### ExternalWork

**_properties:_**

| property       | type           |
| -------------- | -------------- |
| identifier     | string \| null |
| title          | string \| null |
| status         | string \| null |
| url            | string \| null |
| externalSystem | \| string      |

**_methods:_**

#### `update`

**_parameters:_**

- payload: object

**_returns:_** Promise\<null\>

Sends a patch request to the server and if successful, performs an inplace update of the ExternalWork object. The `payload` parameter is an object that can have any of the following properties:

`identifier: string | null; title: string | null; status: string | null; url: string | null;`

### Folder

**_properties:_**

| property       | type           |
| -------------- | -------------- |
| id             | string         |
| name           | string         |
| parentFolderId | string \| null |
| path           | string         |
| createdAt      | Date           |
| modifiedAt     | Date           |

**_methods:_**

#### `getChildFolders`

**_parameteres:_** _(None)_

**_returns:_** Promise<[FolderList](#folderlist)>

#### `getParentFolder`

**_parameteres:_** _(None)_

**_returns:_** Promise<[Folder](#folder) | null>

#### `getRelatedLinks`

**_parameteres:_** _(None)_

**_returns:_** {
self: string;
parentFolder: string | null;
childFolders: string;
assets: string;
}

### FolderList

| property | type                |
| -------- | ------------------- |
| data     | [Folder](#folder)[] |

**_methods:_**

#### `getNextBatch`

**_parameteres:_** _(None)_

**_returns:_** Promise<[FolderList](#folderlist) | null>

#### `getPreviousBatch`

**_parameteres:_** _(None)_

**_returns:_** Promise<[FolderList](#folderlist) | null>

### Label

**_properties:_**

| property | type                         |
| -------- | ---------------------------- |
| group    | { id: string; name: string}  |
| values   | {id: string; name: string}[] |

### LabelGroup

**_properties:_**

| property      | type                           |
| ------------- | ------------------------------ |
| id            | string                         |
| name          | string                         |
| sourceOrgType | string                         |
| values        | { id: string; name: string }[] |

### LabelGroupList

**_properties:_**

| property | type                        |
| -------- | --------------------------- |
| data     | [LabelGroup](#labelgroup)[] |

**_methods:_**

#### `getNextBatch`

**_parameteres:_** _(None)_

**_returns:_** Promise<[LabelGroupList](#labelgrouplist) | null>

#### `getPreviousBatch`

**_parameteres:_** _(None)_

**_returns:_** Promise<[LabelGroupList](#labelgrouplist) | null>

### LibraryArticle

**_properties:_**

| property              | type                          |
| --------------------- | ----------------------------- |
|  id                   |   string                      |
|  title                |   string                      |
|  folderId             |   string \| null              |
|  fileLocation         |   string                      |
|  ownerOrganizationId  |   string                      |
|  htmlBody             |   string                      |
|  labels               |   [Label](#label-1)[]         |
|  groupId              |   string \| null              |
|  metaTitle            |   string \| null              |
|  metaDescription      |   string \| null              |
|  metaUrl              |   string \| null              |
|  metaKeywords         |   string[]                    |
|  sourceArticle        |   string \| null              |
|  url                  |   string \| null              |
|  authors              |   { name: string \| null}[]   |
|  langCode             |   string \| null              |
|  pixelKey             |   string                      |
|  images               |   { attributionText: string \| null; caption: string; description: string \| null; mimeType: string; source: { name: string \| null; }; url: string; height: number; width: number; thumbnail: string \| null; } |
|  createdAt            |   Date                        |
|  modifiedAt           |   Date                        |
|  expiresAt            |   Date \| null                |

### LibraryAsset

**_properties:_**

| property              | type              |
| --------------------- | ----------------- |
| id                    | string            |
| title                 | string            |
| folderId              | string \| null    |
| fileLocation          | string            |
| ownerOrganizationId   | string            |
| type                  | one of: `"article"`, `"image"`, `"video"`, `"raw_file"`, `"structured_content"` |
| mimeType              | string            |
| content               | { type: one of: `"url"`, `"api_url"`, `"html_body"`; value: string; }             |
| createdAt             | Date              |
| modifiedAt            | Date              |

### LibraryAssetList

**_properties:_**

| property | type                            |
| -------- | ------------------------------- |
| data     | [LibraryAsset](#libraryasset)[] |

**_methods:_**

#### `getNextBatch`

**_parameteres:_** _(None)_

**_returns:_** Promise<[LibraryAssetList](#libraryassetlist) | null>

#### `getPreviousBatch`

**_parameteres:_** _(None)_

**_returns:_** Promise<[LibraryAssetList](#libraryassetlist) | null>

### LibraryAssetVersion

**_properties:_**

| property | type                                               |
| -------- | -------------------------------------------------- |
| versionNumber | number                                        |
| assetId       | string                                        |
| title         | string                                        |
| type          | one of: `"image"`, `"video"`, `"raw_file"`    |
| mimeType      | string                                        |
| createdAt     | Date                                          |
| content       | { type: "url"; value: string; }               |

**_methods:_**

#### `getRelatedLinks`

**_parameteres:_** _(None)_

**_returns:_** { asset: string }

### LibraryImage

**_properties:_**

| property              | type                              |
| --------------------- | --------------------------------- |
| id                    | string                            |
| title                 | string                            |
| description           | string \| null                    |
| mimeType              | string                            |
| fileSize              | number                            |
| imageResolution       | { height: number; width: number;} |
| folderId              | string \| null                    |
| fileLocation          | string                            |
| isPublic              | boolean                           |
| url                   | string                            |
| labels                | [Label](#label-1)[]                   |
| ownerOrganizationId   | string                            |
| createdAt             | Date                              |
| modifiedAt            | Date                              |
| expiresAt             | Date \| null                      |

### LibraryRawFile

**_properties:_**

| property              | type                              |
| --------------------- | --------------------------------- |
| id                    | string                            |
| title                 | string                            |
| description           | string \| null                    |
| mimeType              | string                            |
| fileSize              | number                            |
| folderId              | string \| null                    |
| fileLocation          | string                            |
| isPublic              | boolean                           |
| url                   | string                            |
| labels                | [Label](#label-1)[]               |
| ownerOrganizationId   | string                            |
| createdAt             | Date                              |
| modifiedAt            | Date                              |
| expiresAt             | Date \| null                      |

### LibraryVideo

**_properties:_**

| property              | type                              |
| --------------------- | --------------------------------- |
| id                    | string                            |
| title                 | string                            |
| description           | string \| null                    |
| mimeType              | string                            |
| fileSize              | number                            |
| folderId              | string \| null                    |
| fileLocation          | string                            |
| isPublic              | boolean                           |
| url                   | string                            |
| labels                | [Label](#label-1)[]               |
| ownerOrganizationId   | string                            |
| createdAt             | Date                              |
| modifiedAt            | Date                              |
| expiresAt             | Date \| null                      |

### Task

**_properties:_**

| property    | type                    |
| ----------- | ----------------------- |
| id          | string                  |
| title       | string                  |
| startAt     | Date \| null            |
| dueAt       | Date \| null            |
| isCompleted | boolean                 |
| isArchived  | boolean                 |
| referenceId | string                  |
| labels      | [Label](#label-1)[]     |
| steps       | [TaskStep](#taskstep)[] |

**_methods:_**

#### `update`

**_parameters:_**

- payload: object

**_returns:_** Promise\<null\>

Sends a patch request to the server and if successful performs a inplace update of the Task object. The `payload` parameter is an object with the following property:

`labels: { group: string; values: string[] }[]`

#### `getBrief`

**_parameters:_** (None)

**_returns:_** Promise<[TaskBrief](#taskbrief) | null>

Gets the task brief if the task has a brief else it will return `null` promise.

#### `getCampaign`

**_parameters:_** (None)

**_returns:_** Promise<[Campaign](#campaign-1)>

Gets the campaign for the task.

#### `getCustomFields`

**_parameters:_**

- option: object (optional)

**_returns:_** Promise<[CustomFieldList](#customfieldlist) | null>

Gets the custom fields for the task if it has any, else it will return `null` promise. The parameter `option` is an object that can have any of the following properties:

`pageSize: number; offset: number;`

#### `getAssets`

**_parameters:_**

- option: object (optional)

**_returns:_** Promise<[TaskAssetList](#taskassetlist)>

Gets the assets for the task. The parameter `option` is an object that can have any of the following properties:

`pageSize: number; offset: number;`

#### `addAsset`

**_parameters:_**

- uploadedFile: [UploadedFile](#uploadedfile)

**_returns:_** Promise<[TaskAsset](#taskasset)>

Adds a new asset to the task.

#### `getAttachments`

**_parameters:_**

- option: object (optional)

**_returns:_** Promise<[AttachmentList](#attachmentlist)>

Gets the attachments for the task. The parameter `option` is an object that can have any of the following properties:

`pageSize: number; offset: number;`

### TaskArticle

**_properties:_**

| property   | type                |
| ---------- | ------------------- |
| id         | string              |
| title      | string              |
| createdAt  | Date                |
| modifiedAt | Date                |
| htmlBody   | string              |
| url        | string              |
| labels     | [Lable](#label-1)[] |

### TaskAsset

**_properties:_**

| property   | type                                                                            |
| ---------- | ------------------------------------------------------------------------------- |
| id         | string                                                                          |
| title      | string                                                                          |
| mimeType   | string                                                                          |
| createdAt  | Date                                                                            |
| modifiedAt | Date                                                                            |
| labels     | [Label](#label-1)[]                                                             |
| type       | one of: `"article"`, `"image"`, `"video"`, `"raw_file"`, `"structured_content"` |
| content    | { type: oneof: `"url"`, `"api_url"`, `"html_body"`; value: string }             |

**_methods:_**

#### `addDraft`

**_parameteres:_**

- uploadedFile: [UploadedFile](#uploadedfile)

**_returns:_** Promise\<object\>

Adds a draft to the task asset

#### `getComments`

**_parameteres:_** (None)

**_returns:_** Promise\<object\>

Gets the comments for the asset

#### `addComment`

**_parameteres:_**

- comment: object

**_returns:_** Promise\<object\>

Adds a new comment to the task asset. The `comment` parameter is an object with the following properties:

`value: string; attachments: UploadedFile[] (optional);`

### TaskAssetList

**_properties:_**

| property | type                      |
| -------- | ------------------------- |
| data     | [TaskAsset](#taskasset)[] |

**_methods:_**

#### `getNextBatch`

**_parameteres:_** _(None)_

**_returns:_** Promise<[TaskAsset](#taskasset) | null>

#### `getPreviousBatch`

**_parameteres:_** _(None)_

**_returns:_** Promise<[TaskAsset](#taskasset) | null>

### TaskBrief

**_properties:_**

| property | type                                 |
| -------- | ------------------------------------ |
| type     | string                               |
| title    | string                               |
| template | { id: string; name: string } \| null |
| fields   | { name; string; value: string }[]    |

**_methods:_**

#### `getTask`

**_parameteres:_** _(None)_

**_returns:_** Promise<[Campaign](#campaign-1) >

Gets the task the brief is for.

### TaskImage

**_properties:_**

| property        | type                              |
| --------------- | --------------------------------- |
| id              | string                            |
| title           | string                            |
| mimeType        | string                            |
| createdAt       | Date                              |
| modifiedAt      | Date                              |
| labels          | [Lable](#label-1)[]               |
| fileSize        | number                            |
| imageResolution | { height: number; width: number } |
| url             | string                            |

### TaskRawFile

**_properties:_**

| property   | type                |
| ---------- | ------------------- |
| id         | string              |
| title      | string              |
| mimeType   | string              |
| createdAt  | Date                |
| modifiedAt | Date                |
| labels     | [Lable](#label-1)[] |
| fileSize   | number              |
| url        | string              |

### TaskStep

**_properties:_**

| property    | type                          |
| ----------- | ----------------------------- |
| id          | string                        |
| title       | string                        |
| isCompleted | boolean                       |
| description | string \| null                |
| dueAt       | Date \| null                  |
| subSteps    | [TaskSubStep](#tasksubstep)[] |

### TaskSubStep

| property     | type           |
| ------------ | -------------- |
| id           | string         |
| title        | string         |
| assigneeId   | string \| null |
| isCompleted  | boolean        |
| isInProgress | boolean        |
| isSkipped    | boolean        |
| isExternal   | boolean        |

**_methods:_**

#### `update`

**_parameters:_**

- payload: object

**_returns:_** Promise\<void\>

Sends a patch request to Welcome, and if successful, performs a in-place update of the substep. The `payload` parameter is an object that can have one of the following properties:

`assigneeId: string | null; isCompleted: true; isInProgress: true;`

#### `getTask`

**_parameters:_** (None)

**_returns:_** Promise<[Task](#task-1)>

Gets the task for the substep

#### `getExternalWork`

**_parameters:_** (None)

**_returns:_** Promise<[ExternalWork](#externalwork) | null>

Gets the ExternalWork for the substep if the substep is an external substep else returns a `null` promise.

#### `getAssignee`

**_parameters:_** (None)

**_returns:_** Promise<[User](#user-1) | null>

Gets the user who is assigned to the substep. If no one is assigned to the step, it will return a `null` promise.

### TaskVideo

**_properties:_**

| property   | type                |
| ---------- | ------------------- |
| id         | string              |
| title      | string              |
| mimeType   | string              |
| createdAt  | Date                |
| modifiedAt | Date                |
| labels     | [Lable](#label-1)[] |
| fileSize   | number              |
| url        | string              |

### UploadedFile

**_properties:_**

| property | type   |
| -------- | ------ |
| key      | string |
| title    | string |

**_methods:_**

#### `createAsset`

**_parameteres:_** _(None)_

**_returns:_** Promise\<object\>

Adds the uploaded file as a library asset.

#### `addAsAssetVersion`

**_parameteres:_**

- assetId: string

**_returns:_** Promise\<object\>

Adds the uploaded file as a new version for an asset.

#### `addAsTaskAsset`

**_parameteres:_**

- taskId: string

**_returns:_** Promise\<object\>

Adds the uploaded file as a task asset.

#### `addAsTaskAssetDraft`

**_parameteres:_**

- taskId: string
- assetId: string

**_returns:_** Promise\<object\>

Adds the uploaded file as a task asset draft.

### User

**_properties:_**

| property  | type           |
| --------- | -------------- |
| id        | string         |
| firstName | string         |
| lastName  | string         |
| fullName  | string         |
| email     | string \| null |
