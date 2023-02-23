# Folder

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

## `getChildFolders`

**_parameteres:_** _(None)_

**_returns:_** Promise<[FolderList](./FolderList.md)>

## `getParentFolder`

**_parameteres:_** _(None)_

**_returns:_** Promise<[Folder](#folder) | null>

## `getRelatedLinks`

**_parameteres:_** _(None)_

**_returns:_** {
self: string;
parentFolder: string | null;
childFolders: string;
assets: string;
}
