# Task

The `task` module provides functionality to work with Tasks in _Welcome_. The module provides the following methods.

## `getTask`

**_parameters:_**

- taskId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[Task](../objects/Task.md)>

Gets a task with the matching ID

## `updateTask`

**_parameters:_**

- taskId: string
- update: object
- tokenGetParam: any

**_returns:_** Promise<[Task](../objects/Task.md)>

Updates a task with the matching ID. The second parameter `update` is an object that contains the update payload. The update object can have the following property:

`labels: { group: string, values: string[] }[]`

## `getTaskBrief`

**_parameters:_**

- taskId: string
- tokenGetParam: any

**_returns:_** Promise<[TaskBrief](../objects/TaskBrief.md)>

Gets the brief of a task with the matching ID.

## `getTaskCustomFields`

**_parameters:_**

- taskId: string
- option: object (optional)
- tokenGetParam: any (optional)

**_returns:_** Promise<[CustomFieldList](../objects/CustomFieldList.md)>

Gets the custom fields for a task as a [CustomFieldList](../objects/CustomFieldList.md) object. The second parameter `option` can have any of the following properties:

`pazeSize: number; offset: number;`

## `getTaskCustomField`

**_parameters:_**

- taskId: string
- customFieldId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[CustomField](../objects/CustomField.md)>

Gets the details of the custom field with the matching custom field Id for the task with the matching task ID.

## `updateTaskCustomField`

**_parameters:_**

- taskId: string
- customFieldId: string
- update: object
- tokenGetParam: any (optional)

**_returns:_** Promise<[CustomField](../objects/CustomField.md)>

Updates the custom field with the matching custom field ID for the task with the matching task ID. The third parameter `update` is the update payload, with can have the following property:

`values: string[]`

## `getTaskCustomFieldChoices`

**_parameters:_**

- taskId: string
- customFieldId: string
- option: object (optional)
- tokenGetParam: any (optional)

**_returns:_** Promise\<object\>

Gets the aavailable choices for a specific custom field and returns the JSON object received from the server. This function takes an optional `option` object as the third parameter, which can have any of the following properties:

`pageSize: number; offset: number;`

## `getTaskSubstep`

**_parameters:_**

- taskId: string
- stepId: string
- subStepId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[TaskSubStep](../objects/TaskSubStep.md)>

Gets the details of a task sub-step

## `updateTaskSubstep`

**_parameters:_**

- taskId: string
- stepId: string
- subStepId: string
- update: object
- tokenGetParam: any (optional)

**_returns:_** Promise<[TaskSubStep](../objects/TaskSubStep.md)>

Updates the substep of the task specified by the task, step and sub-step IDs. The fourth paramer `update` is the update payload that can have only one of the following properties:

`isCompleted: boolean; isInProgress: boolean; assigneeId: string`

## `getTaskSubstepExternalWork`

**_parameters:_**

- taskId: string
- stepId: string
- subStepId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[ExternalWork](../objects/ExternalWork.md)>

Gets the details of the external work if the substep is an external step.

## `updateTaskSubStepExternalWork`

**_parameters:_**

- taskId: string
- stepId: string
- subStepId: string
- update: object
- tokenGetParam: any (optional)

**_returns:_** Promise<[ExternalWork](../objects/ExternalWork.md)>

Updates an external work associated with the sub-step. The fourth parameter `update` is the update payload that can have any of the following properties:

` identifier: string; title: string; status: string; url: string;`

## `getTaskSubstepComments`

**_parameters:_**

- taskId: string
- stepId: string
- subStepId: string
- option: object (optional)
- tokenGetParam?: any (optional)

**_returns:_** Promise\<object\>

Gets the comments in the specificed sub-step and returns the JSON object received from the server.

## `addTaskSubstepComment`

**_parameters:_**

- taskId: string
- stepId: string
- subStepId: string
- comment: object
- tokenGetParam?: any (optional)

**_returns:_** Promise\<object\>

Posts a comment to the specified sub-step and returns the JSON object received from the server. The fourth parameter `comment` is an object that has the following properties:

`value: string; attachments: UploadedFile[] (optional);`

## `getTaskSubstepComment`

**_parameters:_**

- taskId: string
- stepId: string
- subStepId: string
- commentId: string
- tokenGetParam?: any (optional)

**_returns:_** Promise\<object\>

Gets a task sub-step comment by comment ID and returns the JSON object received from the server.

## `updateTaskSubstepComment`

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

## `deleteTaskSubstepComment`

**_parameters:_**

- taskId: string
- stepId: string
- subStepId: string
- commentId: string
- tokenGetParam: any (optional)

**_returns:_** Promise\<void\>

Deletes a task sub-step comment

## `getTaskAssets`

**_parameters:_**

- taskId: string
- option: object
- tokenGetParam: any (optional)

**_returns:_** Promise<[TaskAssetList](../objects/TaskAssetList.md)>

Gets the task asset list and returns it as a [TaskAssetList](../objects/TaskAssetList.md) object. The second parameter `option` object can have any of the following properties:

`pageSize: number; offset: number;`

## `addTaskAsset`

**_parameters:_**

- taskId: string
- asset: [UploadedFile](../objects/UploadedFile.md)
- tokenGetParam: any (optional)

**_returns:_** Promise<[TaskAsset](../objects/TaskAsset.md)>

Adds a new asset to a task.

## `addTaskAssetDraft`

**_parameters:_**

- taskId: string
- assetId: string
- draft: UploadedFile
- tokenGetParam: any (optional)

**_returns:_** Promise\<object\>

Adds a new draft to the task asset and returns the JSON object received from the server.

## `getTaskAssetComments`

**_parameters:_**

- taskId: string
- assetId: string
- option: object (optional)
- tokenGetParam: any (optional)

**_returns:_** Promise\<object\>

Gets the comments for a task asset. The third optional parameter `option` can have any of the following properties:

`pageSize: number; offset: number;`

## `addTaskAssetComment`

**_parameters:_**

- taskId: string
- assetId: string
- comment: object
- tokenGetParam: any (optional)

**_returns:_** Promise\<object\>

Adds a new comment to a task asset. The third parameter `comment` is an object that has the following properties:

`value: string; attachments: UploadedFile[] (optional);`

## `getTaskAttachments`

**_parameters:_**

- taskId: string
- option: object (optional)
- tokenGetParam: any (optional)

**_returns:_** Promise<[AttachmentList](../objects/AttachmentList.md)>

Gets the attachments of a task. The second parameter `option` is an object that can have any of the following properties:

`pageSize: number; offset: number;`

## `getTaskArticle`

**_parameters:_**

- taskId: string
- articleId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[TaskArticle](../objects/TaskArticle.md)>

Gets the task article

## `getTaskImage`

**_parameters:_**

- taskId: string
- imageId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[TaskImage](../objects/TaskImage.md)>

Gets the task image

## `getTaskVideo`

**_parameters:_**

- taskId: string
- videoId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[TaskVideo](../objects/TaskVideo.md)>

Gets the task video

## `getTaskRawFile`

**_parameters:_**

- taskId: string
- rawFileId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[TaskRawFile](../objects/TaskRawFile.md)>

Gets the task raw file
