# LibraryAssetVersion

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

## `getRelatedLinks`

**_parameteres:_** _(None)_

**_returns:_** { asset: string }
