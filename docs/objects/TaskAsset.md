# TaskAsset

**_properties:_**

| property   | type                                                                            |
| ---------- | ------------------------------------------------------------------------------- |
| id         | string                                                                          |
| title      | string                                                                          |
| mimeType   | string                                                                          |
| createdAt  | Date                                                                            |
| modifiedAt | Date                                                                            |
| labels     | [Label](./Label.md)[]                                                           |
| type       | one of: `"article"`, `"image"`, `"video"`, `"raw_file"`, `"structured_content"` |
| content    | { type: oneof: `"url"`, `"api_url"`, `"html_body"`; value: string }             |

**_methods:_**

## `addDraft`

**_parameteres:_**

- uploadedFile: [UploadedFile](./UploadedFile.md)

**_returns:_** Promise\<object\>

Adds a draft to the task asset

## `getComments`

**_parameteres:_** (None)

**_returns:_** Promise\<object\>

Gets the comments for the asset

## `addComment`

**_parameteres:_**

- comment: object

**_returns:_** Promise\<object\>

Adds a new comment to the task asset. The `comment` parameter is an object with the following properties:

`value: string; attachments: UploadedFile[] (optional);`
