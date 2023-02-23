# LibraryImage

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
| labels                | [Label](./Label.md)[]             |
| ownerOrganizationId   | string                            |
| createdAt             | Date                              |
| modifiedAt            | Date                              |
| expiresAt             | Date \| null                      |
