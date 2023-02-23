# Library

The `library` module provides functionality to work with the assets in _Welcome_ Library. The module provides the following methods.

## `getAssets`

**_parameters:_**

- option: object (optional)
- tokenGetParam: any (optional)

**_returns:_** Promise<[LibraryAssetList](../objects/LibraryAssetList.md)>

Fetches the assets in library. The first parameter `option` is an `object` to filter the assets. The `option` object can have any of the following properties:

* `type`: `array`. (values: `article`, `image`, `video`, `raw_file`, `structured_content`)
* `createdAt_From`: `string`
* `createdAt_To`: `string`
* `modifiedAt_From`: `string`
* `modifiedAt_To`: `string`
* `folderId`: `string`
* `includeSubfolderAssets`: `boolean`
* `offset`: `number`
* `pageSize`: `number`

## `addAsset`

**_parameters:_**

- uploadedFile: [UploadedFile](../objects/UploadedFile.md)
- tokenGetParam: any (optional)

**_returns:_** Promise<[LibraryAsset](../objects/LibraryAsset.md)>

Adds a new asset to the library.

## `addAssetVersion`

**_parameters:_**

- assetId: string
- uploadedFile: [UploadedFile](../objects/UploadedFile.md)
- tokenGetParam: any (optional)

**_returns:_** Promise<[LibraryAssetVersion](../objects/LibraryAssetVersion.md)>

Adds a new version of an asset in the library.

## `getFolders`

**_parameters:_**

- option: object (optional)
- tokenGetParam: any (optional)

**_returns:_** Promise<[FolderList](../objects/FolderList.md)>

Fetches the folders in the library. The first parameter `option` is an object which can have any of the following properties:

`parentFolderId`: `string`<br/>
`offset`: `number` <br />
`pageSize`: `number`<br/>

## `getFolderById`

**_parameters:_**

- folderId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[Folder](../objects/Folder.md)>

Gets the folder with the matching id.

## `getArticleById`

**_parameters:_**

- articleId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[LibraryArticle](../objects/LibraryArticle.md)>

Gets the article with the matching id.

## `getImageById`

**_parameters:_**

- imageId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[LibraryImage](../objects/LibraryImage.md)>

Gets the image with the matching id.

## `updateImageById`

**_parameters:_**

- imageId: string
- update: object
- tokenGetParam: any (optional)

**_returns:_** Promise<[LibraryImage](../objects/LibraryImage.md)>

Updates the details of a library image. The second parameter `update` can have any of the following properties:

`title`: `string` <br/>
`isPublic`: `boolean`<br/>
`expiresAt`: `string` | `null`<br/>
`labels`: `{ group: string, values: string[] }[]` <br/>

## `deleteImageById`

**_parameters:_**

- imageId: string
- tokenGetParam: any (optional)

**_returns:_** Promise\<void\>

Deletes the image with the matching id from the library.

## `getVideoById`

**_parameters:_**

- videoId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[LibraryVideo](../objects/LibraryVideo.md)>

Gets the video with the matching id.

## `updateVideoById`

**_parameters:_**

- videoId: string
- update: object
- tokenGetParam: any (optional)

**_returns:_** Promise<[LibraryVideo](../objects/LibraryVideo.md)>

Updates the details of a library video. The second parameter `update` can have any of the following properties:

`title`: `string` <br/>
`isPublic`: `boolean`<br/>
`expiresAt`: `string` | `null`<br/>
`labels`: `{ group: string, values: string[] }[]` <br/>

## `deleteVideoById`

**_parameters:_**

- videoId: string
- tokenGetParam: any (optional)

**_returns:_** Promise\<void\>

Deletes the video with the matching id from the library.

## `getRawFileById`

**_parameters:_**

- rawFileId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[LibraryRawFile](../objects/LibraryRawFile.md)>

Gets the raw file with the matching id.

## `updateRawFileById`

**_parameters:_**

- rawFileId: string
- update: object
- tokenGetParam: any (optional)

**_returns:_** Promise<[LibraryRawFile](../objects/LibraryRawFile.md)>

Updates the details of a library raw file. The second parameter `update` can have any of the following properties:

`title`: `string` <br/>
`isPublic`: `boolean`<br/>
`expiresAt`: `string` | `null`<br/>
`labels`: `{ group: string, values: string[] }[]` <br/>

## `deleteRawFileById`

**_parameters:_**

- rawFileId: string
- tokenGetParam: any (optional)

**_returns:_** Promise\<void\>

Deletes the raw file with the matching id from the library.
