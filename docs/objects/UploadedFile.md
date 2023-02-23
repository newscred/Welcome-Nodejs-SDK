# UploadedFile

**_properties:_**

| property | type   |
| -------- | ------ |
| key      | string |
| title    | string |

**_methods:_**

## `createAsset`

**_parameteres:_** _(None)_

**_returns:_** Promise\<object\>

Adds the uploaded file as a library asset.

## `addAsAssetVersion`

**_parameteres:_**

- assetId: string

**_returns:_** Promise\<object\>

Adds the uploaded file as a new version for an asset.

## `addAsTaskAsset`

**_parameteres:_**

- taskId: string

**_returns:_** Promise\<object\>

Adds the uploaded file as a task asset.

## `addAsTaskAssetDraft`

**_parameteres:_**

- taskId: string
- assetId: string

**_returns:_** Promise\<object\>

Adds the uploaded file as a task asset draft.
