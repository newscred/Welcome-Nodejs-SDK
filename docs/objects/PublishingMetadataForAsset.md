# PublishingMetadataForAsset

**_properties:_**

| property                       | type                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------- |
| id                             | string                                                                          |
| assetId                        | string                                                                          |
| assetType                      | one of: `"article"`, `"image"`, `"video"`, `"raw_file"`, `"structured_content"` |
| status                         | one of: `"published"`, `"unpublished"`, `"synced"`, `"failed"`, null            |
| statusMessage                  | string \| null                                                                  |
| locale                         | string \| null                                                                  |
| publicUrl                      | string \| null                                                                  |
| publishingDestinationUpdatedAt | Date \| null                                                                    |
