# Welcome Nodejs SDK

Table of contents
* [Getting started](#getting-started)
* [Initializaing App](#initializing-the-app)
* [Modules](#modules)
    * [Auth](#auth)
    * [Campaign](#campaign)
    * [Label](#label)
    * [Library](#library)
    * [Task](#task)
    * [Uploader](#uploader)
    * [User](#user)
* [Objects](#objects)


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
import { WelcomeClient } from 'welcome-sdk';
```

## Initializing the App

```javascript
const welcomeClient = new WelcomeClient(param)
```

`param` is an object with the following properties

| Property | type | description
| -------- | ---- | ----------- 
| `accessToken` | `string` \|<br/> `((tokenGetParam: any) => string \| Promise<string>)` | Value of the access token to be used or a function that returns an access token. The optional `tokenGetParam` parameter can be a `string`, `object` or a `function` that the function may need to fetch the access token
| `refreshToken` | `string` \|<br/> `((tokenGetParam: any) => string \| Promise<string>)` | Value of the refresh token to be used or a function that returns a refresh token. The optional `tokenGetParam` parameter can be a `string`, `object` or a `function` that the function may need to fetch the refresh token
| `clientId` | `string` | The client Id of the app registered in Welcome. If you omit this field, the app will try to extract the value from `WELCOME_CLIENT_ID` environment variable
| `clientSecret` | `string` | The client secret of the app registered in Welcome. If you omit this field, the app will try to extract the value from `WELCOME_CLIENT_SECRET` environment variable 
| `redirectUri` | `string` | The redirect URI registered in Welcome with the associated app
| `enableAutoRetry` | `boolean` | If `true` the app will try to update the access token using the refresh token if any api call encounters `401 Unauthorized` error and retry again. If second retry also fails, the app will raise an error. <br />Default: `false`
| `onAuthSuccess` | `(accessToken: string, refreshToken: string, tokenGetParam: any) => any` | This function will be called when authorization code flow completes successfully. You can omit this field if you handle oauth callback manually.
| `onAuthFailure` | `(error: string) => any` | This function will be called if authorization server redirects to redirect URL with any error. You can omit this field if you handle oauth callback manually
| `tokenChangeCallback` | `(accessToken: string, refreshToken: string, tokenGetParam: any) => any` | This function will be called when the app updates the current tokens. You can use this function to store the updated access and refresh tokens in your database. The optional third parameter `tokenGetParam` can be a `string`, `object` or a `function` that the function may need to map the access and refresh token according to your app's requirement

In the following sections, many of the functions will have an optional parameter `tokenGetParam`. If you use functions as the `accessToken` and/or `refreshToken` properties, and if any parameter is required for those functions to work, then you must always pass the `tokenGetParam` parameter. You can only ignore that optional parameter, if your token getter functions do not require any parameter.

## Modules

The initialized object has several modules and each module has their own methods.

### Auth

The `auth` module provides the following methods.

#### `initiateOAuth`

***parameters:***

* redirectFn: (url: string) => void

***returns:*** `undefined`

Initializes Welcome authorization flow. This method takes a function that takes a url string as a parameter and can redirect the user to the provided url (see the example below)

#### `handleOAuthCallback`

***parameters:***

* query: object
* tokenGetParam: any (optional)

***returns:*** Promise<ReturnType<`tokenRefreshCallback`> | void>

Handles the redirection callback from Welcome authorization server. This method takes the query object sent by the authorization server as the parameter (see the example below)

#### `rotateTokens`

***parameters:***

* tokenGetParam: any (optional)

***returns:*** Promise\<void\>

Updates the access token using the refresh token.

#### `revokeAccessToken`

***parameters:***

* tokenGetParam: any (optional)

***returns:*** Promise\<void\>

Sends a request to the authorization server to revoke the access token

#### `revokeRefreshToken`

***parameters:***

* tokenGetParam: any

***returns:*** Promise\<void\>

Sends a request to the authorization server to revoke the refresh token

#### `getAccessToken`

***parameters:***

* tokenGetParam: any

***returns:*** Promise\<string\>

Gets the current access token in the app.

#### `getRefreshToken`

***parameters:***

* tokenGetParam: any

***returns:*** Promise\<string\>

Gets the current refresh token in the app.

**Example**

An example of integrating with an express app.
```javascript

import express from 'express';
import { WelcomeClient } from 'welcome-sdk';

const app = express()
const welcomeClient = new WelcomeClient(param)

app.get('welcome/oauth', (req, res) => {
    welcomeClient.auth.initiateOAuth((url) => res.redirect(url))
})

app.get('welcome/oauth/callback', async (req, res) => {
    try {
        await welcomeClient.auth.handleOAuthCallback(req.query)
        return res.send('success')
    } catch (err) {
        return res.status(err.code).json({ message: err.message })
    }
})

app.listen(process.env.PORT)

```

----------------------------

### Campaign

The `campaign` module provides the following methods.

#### `getCampaignById`

***parameters:***

* campaignId: string
* tokenGetParam: any (optional)

***returns:*** Promise<[Campaign](#campaign-1)>

Gets a campaign by its id.

#### `getCampaignBrief`

***parameters:***

* campaignId: string
* tokenGetParam: any (optional)

***returns:*** Promise<[CampaignBrief](#campaignbrief)>

Gets the brief of the campaign specified by the id

---------------------------------------


### Label

The `label` module provides the following methods

#### `getLabelGroups`

***parameters:***

* filter: object (optional)
* tokenGetParam: any (optional)

***returns:*** Promise<[LabelGroupList](#labelgrouplist)>

Fetches the available Label groups in your Welcome instance. The first parameter `filter` is an `object` to filter the label groups. The `filter` object can have any of the following properties:

`sourceOrgType`: `'current' | 'related'` <br /> 
`offset`: `number` <br /> 
`pageSize`: `number`

-----------------------------------------

### Library

The `library` module provides the following methods

#### `getAssets`

TODO

#### `getFolders`

TODO

#### `getFolderById`

TODO

#### `getArticleById`

TODO

#### `getImageById`

TODO

#### `updateImageById`

TODO

#### `deleteImageById`

TODO

#### `getVideoById`

TODO

#### `updateVideoById`

TODO

#### `deleteVideoById`

TODO

#### `getRawFileById`

TODO

#### `updateRawFileById`

TODO

#### `deleteRawFileById`

TODO


(TODO)

---------------------------------------

### Task

The `task` module provides the following methods

#### `getTask`

***parameters:***

* taskId: string
* tokenGetParam: any (optional)

***returns:*** Promise<[Task](#task-1)>

Gets a task with the matching ID

#### `updateTask`

***parameters:***

* taskId: string
* update: object
* tokenGetParam: any

***returns:*** Promise<[Task](#task-1)>

Updates a task with the matching ID. The second parameter `update` is an object that contains the update payload. The update object can have the following property:

`labels: {
    group: string,
    values: string[],
}`

#### `getTaskBrief`

***parameters:***

* taskId: string
* tokenGetParam: any

***returns:*** Promise<[TaskBrief](#taskbrief)>

Gets the brief of a task with the matching ID.

#### `getTaskCustomFields`

***parameters:***

* taskId: string
* option: object (optional)
* tokenGetParam: any (optional)

***returns:*** Promise<[CustomFieldList](#customfieldlist)>

Gets the custom fields for a task as a [CustomFieldList](#customfieldlist) object. The second parameter `option` can have any of the following properties:

`
pazeSize: number;
offset: number;
`

#### `getTaskCustomField`

***parameters:***

* taskId: string
* customFieldId: string
* tokenGetParam: any (optional)

***returns:*** Promise<[CustomField](#customfield)>

Gets the details of the custom field with the matching custom field Id for the task with the matching task ID.

#### `updateTaskCustomField`

***parameters:***

* taskId: string
* customFieldId: string
* update: object
* tokenGetParam: any (optional)

***returns:*** Promise<[CustomField](#customfield)>

Updates the custom field with the matching custom field ID for the task with the matching task ID. The third parameter `update` is the update payload, with can have the following property:

`values: string[]`

#### `getTaskCustomFieldChoices`

***parameters:***

* taskId: string
* customFieldId: string
* option: object (optional)
* tokenGetParam: any (optional)

***returns:*** Promise\<object\>

Gets the aavailable choices for a specific custom field and returns the JSON object received from the server. This function takes an optional `option` object as the third parameter, which can have any of the following properties:

`
pageSize: number;
offset: number;
`

#### `getTaskSubstep`

***parameters:***

* taskId: string
* stepId: string
* subStepId: string
* tokenGetParam: any (optional)

***returns:*** Promise<[TaskSubStep](#tasksubstep)>

Gets the details of a task sub-step

#### `updateTaskSubstep`

***parameters:***

* taskId: string
* stepId: string
* subStepId: string
* update: object
* tokenGetParam: any (optional)

***returns:*** Promise<[TaskSubStep](#tasksubstep)>

Updates the substep of the task specified by the task, step and sub-step IDs. The fourth paramer `update` is the update payload that can have only one of the following properties:

`
isCompleted: boolean;
isInProgress: boolean;
assigneeId: string
`

#### `getTaskSubstepExternalWork`

***parameters:***

* taskId: string
* stepId: string
* subStepId: string
* tokenGetParam: any (optional)

***returns:*** Promise<[ExternalWork](#externalwork)>

Gets the details of the external work if the substep is an external step.

#### `updateTaskSubStepExternalWork`

***parameters:***

* taskId: string
* stepId: string
* subStepId: string
* update: object
* tokenGetParam: any (optional)

***returns:*** Promise<[ExternalWork](#externalwork)>

Updates an external work associated with the sub-step. The fourth parameter `update` is the update payload that can have any of the following properties:

`
  identifier: string;
  title: string;
  status: string;
  url: string;
`

#### `getTaskSubstepComments`

***parameters:***

* taskId: string
* stepId: string
* subStepId: string
* option: object (optional)
* tokenGetParam?: any (optional)

***returns:*** Promise\<object\>

Gets the comments in the specificed sub-step and returns the JSON object received from the server.

#### `addTaskSubstepComment`

***parameters:***

* taskId: string
* stepId: string
* subStepId: string
* comment: object
* tokenGetParam?: any (optional)

***returns:*** Promise\<object\>

Posts a comment to the specified sub-step and returns the JSON object received from the server. The fourth parameter `comment` is an object that has the following properties:

`
value: string;
attachments: UploadedFile[] (optional);
`

#### `getTaskSubstepComment`

***parameters:***

* taskId: string
* stepId: string
* subStepId: string
* commentId: string
* tokenGetParam?: any (optional)

***returns:*** Promise\<object\>

Gets a task sub-step comment by comment ID and returns the JSON object received from the server.

#### `updateTaskSubstepComment`

***parameters:***

* taskId: string
* stepId: string
* subStepId: string
* commentId: string
* update: object
* tokenGetParam?: any (optional)

***returns:*** Promise\<object\>

Updates a task sub-step comment and returns the JSON object received from the server. The fifth parameter `update` is the update payload which has the following property:

`value: string;`

#### `deleteTaskSubstepComment`

***parameters:***

* taskId: string
* stepId: string
* subStepId: string
* commentId: string
* tokenGetParam: any (optional)

***returns:*** Promise\<void\>

Deletes a task sub-step comment

#### `getTaskAssets`

***parameters:***

* taskId: string
* option: object
* tokenGetParam: any (optional)

***returns:*** Promise<[TaskAssetList](#taskassetlist)>

Gets the task asset list and returns it as a [TaskAssetList](#taskassetlist) object. The second parameter `option` object can have any of the following properties:

`
pageSize: number;
offset: number;
`

#### `addTaskAsset`

***parameters:***

* taskId: string
* asset: [UploadedFile](#uploadedfile)
* tokenGetParam: any (optional)

***returns:*** Promise<[TaskAsset](#taskasset)>

Adds a new asset to a task.

#### `addTaskAssetDraft`

***parameters:***

* taskId: string
* assetId: string
* draft: UploadedFile
* tokenGetParam: any (optional)

***returns:*** Promise\<object\>

Adds a new draft to the task asset and returns the JSON object received from the server.

#### `getTaskAssetComments`

***parameters:***

* taskId: string
* assetId: string
* option: object (optional)
* tokenGetParam: any (optional)

***returns:*** Promise\<object\>

Gets the comments for a task asset. The third optional parameter `option` can have any of the following properties:

`
pageSize: number;
offset: number;
`

#### `addTaskAssetComment`

***parameters:***

* taskId: string
* assetId: string
* comment: object
* tokenGetParam: any (optional)

***returns:*** Promise\<object\>

Adds a new comment to a task asset. The third parameter `comment` is an object that has the following properties:

`
value: string;
attachments: UploadedFile[] (optional);
`

#### `getTaskAttachments`

***parameters:***

* taskId: string
* option: object (optional)
* tokenGetParam: any (optional)

***returns:*** Promise<[AttachmentList](#attachmentlist)>

Gets the attachments of a task. The second parameter `option` is an object that can have any of the following properties:

`
pageSize: number;
offset: number;
`

#### `getTaskArticle`

***parameters:***

* taskId: string
* articleId: string
* tokenGetParam: any (optional)

***returns:*** Promise<[TaskArticle](#taskarticle)>

Gets the task article

#### `getTaskImage`

***parameters:***

* taskId: string
* imageId: string
* tokenGetParam: any (optional)

***returns:*** Promise<[TaskImage](#taskimage)>

Gets the task image

#### `getTaskVideo`

***parameters:***

* taskId: string
* videoId: string
* tokenGetParam: any (optional)

***returns:*** Promise<[TaskVideo](#taskvideo)>

Gets the task video

#### `getTaskRawFile`

***parameters:***

* taskId: string
* rawFileId: string
* tokenGetParam: any (optional)

***returns:*** Promise<[TaskRawFile](#taskrawfile)>

Gets the task raw file

------------------------------

### Uploader

The `uploader` module provides the following methods

#### `upload`

***parameters:***

* readStream: ReadableStream
* title: string (optional)
* tokenGetParam: any (optional)

***returns:*** Promise<[UploadedFile](#uploadedfile)>

Uploads a file to Welcome. It takes a read stream of the file that is to be uploaded as its first parameter. The second parameter is the title of the file which is optional. If omited, the default title will be "(no title)"

**Example**

```javascript
const readStream = fs.createReadStream("myfile.mp4");
const uploadedFile = await app.uploader.upload(readStream)
uploadedFile.title = "My File"
// do something with the uploaded file
// uploadedFile.createAsset()
```

Example with express and multer middleware
```javascript
const welcomeClient = new WelcomeClient(param)
const app = express();
const upload = multer();
app.post("/upload", upload.single("file"), async (req, res) => {
    const uploadedFile = await welcomeClient.uploader.upload(req.file.buffer, req.file.originalname);
    // do something with the uploaded file
    // const asset = await uploadedFile.createAsset();
    return res.json({ success: true });
});
```

-------------------------------

### User

The `user` module provides the following methods

#### `getUserById`

***parameters:***

* userId: string
* tokenGetParam: any (optional)

***returns:*** Promise<[User](#user-1)>

Gets the user by the id

#### `getUserByEmail`

***parameters:***

* email: string
* tokenGetParam: any (optional)

***returns:*** Promise<[User](#user-1)>

Gets the user with the matching email address

-----------------------------------------

## Objects

### Attachment

***properties:***

| property | type   |
| -------- | ------ |
| id       | string |
| name     | string |
| url      | string |


### AttachmentList

***properties:***

| property      | type                        |
| --------      | ------                      |
| data          | [Attachment](#attachment)[] |


***methods:***

#### `getNextBatch`

***parameteres:*** *(None)*

***returns:*** Promise<[AttachmentList](#attachmentlist) | null>

#### `getPreviousBatch`

***parameteres:*** *(None)*

***returns:*** Promise<[AttachmentList](#attachmentlist) | null>

### Budget

***properties:***

| property | type   |
| -------- | ------ |
| curencyCode | string |
| budgetedAmount | string |

### Campaign

***properties:***

| property      | type                          |
| ------------- | ----------------------------- |
| id            | string                        |
| title         | string                        |
| description   | string \| null                |
| startDate     | Date \| null                  |
| endDate       | Date \| null                  |
| isHidden      | boolean                       |
| referenceId   | string                        |
| budget        | [Budget](#budget) \| null     |
| labels        | [Label](#label-1)[] \| null   |


***methods:***

#### `getBrief`

***parameteres:*** *(None)*

***returns:*** Promise<[CampaignBrief](#campaignbrief) | null>

Gets the campaigns brief if it has one.

#### `getOwner`

***parameteres:*** *(None)*

***returns:*** Promise<[User](#user-1) | null>

Gets the campaigns owner. If the campaign has no owner, it will return `null` promise.

#### `getChildCampaigns`

***parameteres:*** *(None)*

***returns:*** Promise<[Campaign](#campaign-1)[]>

Gets the child campaigns of the campaign.

#### `getParentCampaign`

***parameteres:*** *(None)*

***returns:*** Promise<[Campaign](#campaign-1) | null>

Gets the parent campaign of the campaign.

### CampaignBrief

***properties:***

| property      | type                                  |
| ------------- | ------------------------------------- |
| type          | string                                |
| title         | string                                |
| template      | { id: string; name: string } \| null  |
| fields        | { name; string; value: string }[]     |

***methods:***
#### `getCampaign`

***parameteres:*** *(None)*

***returns:*** Promise<[Campaign](#campaign-1) >

Gets the campaign the brief is for.

### CustomField

***properties:***

| property      | type                          |
| ------------- | ----------------------------- |
| id  | string                        |
| name | string
| type  | one of: `"text_field"`, `"multi_line_text_field"`, `"checkboxes"`, `"dropdown"`, `"multi_select_dropdown"`, `"multiple_choice"`, `"date_field"`, `"image"`, `"video"`, `"rich_text_field"` |
| values    | { name; string; value: string }[] |

***methods:***

#### `getChoices`

***parameters:***

* option: object

***returns:*** Promise\<object\>

Gets the possible choices for the field. The `option` parameter is an object which can have any of the following properties,

`
pageSize: number;
offset: number;
`

### CustomFieldList

***properties:***

| property      | type                        |
| --------      | ------                      |
| data          | [CustomField](#customfield)[] |


***methods:***

#### `getNextBatch`

***parameteres:*** *(None)*

***returns:*** Promise<[CustomField](#customfield) | null>

#### `getPreviousBatch`

***parameteres:*** *(None)*

***returns:*** Promise<[CustomField](#customfield) | null>


### ExternalWork

***properties:***

| property          | type              |
| ----------------- | ----------------- |
| identifier        | string \| null    |
| title             | string \| null    |
| status            | string \| null    |
| url               | string \| null    |
| externalSystem    | \| string         |

***methods:***

#### `update`

***parameters:***

* payload: object

***returns:*** Promise\<null\>

Sends a patch request to the server and if successful, performs an inplace update of the ExternalWork object. The `payload` parameter is an object that can have any of the following properties:

`
identifier: string | null;
title: string | null;
status: string | null;
url: string | null;
`

### Label

***properties:***

| property | type   |
| -------- | ------ |
| group | { id: string; name: string} |
| values | {id: string; name: string}[] |

### LabelGroup

`LabelGroup` object does not have any additional method

### LabelGroupList

***properties:***

| property      | type                        |
| --------      | ------                      |
| data          | [LabelGroup](#labelgroup)[] |


***methods:***

#### `getNextBatch`

***parameteres:*** *(None)*

***returns:*** Promise<[LabelGroup](#labelgroup) | null>

#### `getPreviousBatch`

***parameteres:*** *(None)*

***returns:*** Promise<[LabelGroup](#labelgroup) | null>


### LibraryAsset

TODO

### Task

***properties:***

| property      | type                      |
| ------------- | ------------------------- |
| id            | string                    |
| title         | string                    |
| startAt       | Date \| null              |
| dueAt         | Date \| null              |
| isCompleted   | boolean                   |
| isArchived    | boolean                   |
| referenceId   | string                    |
| labels        | [Label](#label-1)[]       |
| steps         | [TaskStep](#taskstep)[]   |

***methods:***

#### `update`

***parameters:***

* payload: object

***returns:*** Promise\<null\>

Sends a patch request to the server and if successful performs a inplace update of the Task object. The `payload` parameter is an object with the following property:

`
labels: { group: string; values: string[] }[]
`

#### `getBrief`

***parameters:*** (None)

***returns:*** Promise<[TaskBrief](#taskbrief) | null>

Gets the task brief if the task has a brief else it will return `null` promise.

#### `getCampaign`

***parameters:*** (None)

***returns:*** Promise<[Campaign](#campaign-1)>

Gets the campaign for the task.

#### `getCustomFields`

***parameters:***

* option: object (optional)

***returns:*** Promise<[CustomFieldList](#customfieldlist) | null>

Gets the custom fields for the task if it has any, else it will return `null` promise. The parameter `option` is an object that can have any of the following properties:

`
pageSize: number;
offset: number;
`

#### `getAssets`

***parameters:***

* option: object (optional)

***returns:*** Promise<[TaskAssetList](#taskassetlist)>

Gets the assets for the task. The parameter `option` is an object that can have any of the following properties:

`
pageSize: number;
offset: number;
`

#### `addAsset`

***parameters:***

* uploadedFile: [UploadedFile](#uploadedfile)

***returns:*** Promise<[TaskAsset](#taskasset)>

Adds a new asset to the task.

#### `getAttachments`

***parameters:***

* option: object (optional)

***returns:*** Promise<[AttachmentList](#attachmentlist)>

Gets the attachments for the task. The parameter `option` is an object that can have any of the following properties:

`
pageSize: number;
offset: number;
`

### TaskArticle

***properties:***

| property      | type                  |
| ------------- | --------------------- |
| id            | string                |
| title         | string                |
| createdAt     | Date                  |
| modifiedAt    | Date                  |
| htmlBody      | string                |
| url           | string                |
| labels        | [Lable](#label-1)[]   |

### TaskAsset

***properties:***

| property      | type |
| ------------- | ---- |
| id            | string                |
| title         | string                |
| mimeType      | string                |
| createdAt     | Date                  |
| modifiedAt    | Date                  |
| labels        | [Label](#label-1)[] |
| type          | one of: `"article"`, `"image"`, `"video"`,  `"raw_file"`, `"structured_content"` |
| content       | { type: oneof: `"url"`, `"api_url"`, `"html_body"`; value: string } |

***methods:***

#### `addDraft`

***parameteres:***

* uploadedFile: [UploadedFile](#uploadedfile)

***returns:*** Promise\<object\>

Adds a draft to the task asset

#### `getComments`

***parameteres:*** (None)

***returns:*** Promise\<object\>

Gets the comments for the asset

#### `addComment`

***parameteres:***

* comment: object

***returns:*** Promise\<object\>

Adds a new comment to the task asset. The `comment` parameter is an object with the following properties:

`
value: string;
attachments: UploadedFile[] (optional);
`


### TaskAssetList

***properties:***

| property      | type                        |
| --------      | ------                      |
| data          | [TaskAsset](#taskasset)[]   |


***methods:***

#### `getNextBatch`

***parameteres:*** *(None)*

***returns:*** Promise<[TaskAsset](#taskasset) | null>

#### `getPreviousBatch`

***parameteres:*** *(None)*

***returns:*** Promise<[TaskAsset](#taskasset) | null>


### TaskBrief

***properties:***

| property      | type                                  |
| ------------- | ------------------------------------- |
| type          | string                                |
| title         | string                                |
| template      | { id: string; name: string } \| null  |
| fields        | { name; string; value: string }[]     |

***methods:***
#### `getTask`

***parameteres:*** *(None)*

***returns:*** Promise<[Campaign](#campaign-1) >

Gets the task the brief is for.

### TaskImage

***properties:***

| property          | type                              |
| ----------------- | --------------------------------- |
| id                | string                            |
| title             | string                            |
| mimeType          | string                            |
| createdAt         | Date                              |
| modifiedAt        | Date                              |
| labels            | [Lable](#label-1)[]               |
| fileSize          | number                            |
| imageResolution   | { height: number; width: number } |
| url               | string                            |

### TaskRawFile

***properties:***

| property          | type                              |
| ----------------- | --------------------------------- |
| id                | string                            |
| title             | string                            |
| mimeType          | string                            |
| createdAt         | Date                              |
| modifiedAt        | Date                              |
| labels            | [Lable](#label-1)[]               |
| fileSize          | number                            |
| url               | string                            |

### TaskStep

***properties:***

| property      | type                          |
| ------------- | ----------------------------- |
| id            | string                        |
| title         | string                        |
| isCompleted   | boolean                       |
| description   | string \| null                |
| dueAt         | Date \| null                  |
| subSteps      | [TaskSubStep](#tasksubstep)[] |

### TaskSubStep

| property      | type              |
| ------------- | ----------------- |
| id            | string            |
| title         | string            |
| assigneeId    | string \| null    |
| isCompleted   | boolean           |
| isInProgress  | boolean           |
| isSkipped     | boolean           |
| isExternal    | boolean           |

***methods:***

#### `update`

***parameters:***

* payload: object

***returns:*** Promise\<void\>

Sends a patch request to Welcome, and if successful, performs a in-place update of the substep. The `payload` parameter is an object that can have one of the following properties:

`
assigneeId: string | null;
isCompleted: true;
isInProgress: true;
`

#### `getTask`

***parameters:*** (None)

***returns:*** Promise<[Task](#task-1)>

Gets the task for the substep

#### `getExternalWork`

***parameters:*** (None)

***returns:*** Promise<[ExternalWork](#externalwork) | null>

Gets the ExternalWork for the substep if the substep is an external substep else returns a `null` promise.

#### `getAssignee`

***parameters:*** (None)

***returns:*** Promise<[User](#user-1) | null>

Gets the user who is assigned to the substep. If no one is assigned to the step, it will return a `null` promise.

### TaskVideo

***properties:***

| property          | type                              |
| ----------------- | --------------------------------- |
| id                | string                            |
| title             | string                            |
| mimeType          | string                            |
| createdAt         | Date                              |
| modifiedAt        | Date                              |
| labels            | [Lable](#label-1)[]               |
| fileSize          | number                            |
| url               | string                            |

### UploadedFile

***properties:***

| property  | type              |
| --------  | ----------------- |
| key       | string            |
| title     | string            |

***methods:***

#### `createAsset`

***parameteres:*** *(None)*

***returns:*** Promise\<object\>

Adds the uploaded file as a library asset.

#### `addAsAssetVersion`

***parameteres:***

* assetId: string

***returns:*** Promise\<object\>

Adds the uploaded file as a new version for an asset.

#### `addAsTaskAsset`

***parameteres:***

* taskId: string

***returns:*** Promise\<object\>

Adds the uploaded file as a task asset.

#### `addAsTaskAssetDraft`

***parameteres:*** 

* taskId: string
* assetId: string

***returns:*** Promise\<object\>

Adds the uploaded file as a task asset draft.

### User

***properties:***

| property  | type              |
| --------  | ----------------- |
| id        | string            |
| firstName | string            |
| lastName  | string            |
| fullName  | string            |
| email     | string \| null    |
