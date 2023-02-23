# LibraryAsset

**_properties:_**

| property            | type                                                                            |
| ------------------- | ------------------------------------------------------------------------------- |
| id                  | string                                                                          |
| title               | string                                                                          |
| folderId            | string \| null                                                                  |
| fileLocation        | string                                                                          |
| ownerOrganizationId | string                                                                          |
| type                | one of: `"article"`, `"image"`, `"video"`, `"raw_file"`, `"structured_content"` |
| mimeType            | string                                                                          |
| content             | { type: one of: `"url"`, `"api_url"`, `"html_body"`; value: string; }           |
| createdAt           | Date                                                                            |
| modifiedAt          | Date                                                                            |
