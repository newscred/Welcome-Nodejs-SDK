# Task

**_properties:_**

| property    | type                        |
| ----------- | --------------------------- |
| id          | string                      |
| title       | string                      |
| startAt     | Date \| null                |
| dueAt       | Date \| null                |
| isCompleted | boolean                     |
| isArchived  | boolean                     |
| referenceId | string                      |
| labels      | [Label](./Label.md)[]       |
| steps       | [TaskStep](./TaskStep.md)[] |

**_methods:_**

## `update`

**_parameters:_**

- payload: object

**_returns:_** Promise\<null\>

Sends a patch request to the server and if successful performs a inplace update of the Task object. The `payload` parameter is an object with the following property:

`labels: { group: string; values: string[] }[]`

## `getBrief`

**_parameters:_** (None)

**_returns:_** Promise<[TaskBrief](./TaskBrief.md) | null>

Gets the task brief if the task has a brief else it will return `null` promise.

## `getCampaign`

**_parameters:_** (None)

**_returns:_** Promise<[Campaign](./Campaign.md)>

Gets the campaign for the task.

## `getCustomFields`

**_parameters:_**

- option: object (optional)

**_returns:_** Promise<[CustomFieldList](./CustomFieldList.md) | null>

Gets the custom fields for the task if it has any, else it will return `null` promise. The parameter `option` is an object that can have any of the following properties:

`pageSize: number; offset: number;`

## `getAssets`

**_parameters:_**

- option: object (optional)

**_returns:_** Promise<[TaskAssetList](./TaskAssetList.md)>

Gets the assets for the task. The parameter `option` is an object that can have any of the following properties:

`pageSize: number; offset: number;`

## `addAsset`

**_parameters:_**

- uploadedFile: [UploadedFile](./UploadedFile.md)

**_returns:_** Promise<[TaskAsset](./TaskAsset.md)>

Adds a new asset to the task.

## `getAttachments`

**_parameters:_**

- option: object (optional)

**_returns:_** Promise<[AttachmentList](./AttachmentList.md)>

Gets the attachments for the task. The parameter `option` is an object that can have any of the following properties:

`pageSize: number; offset: number;`
