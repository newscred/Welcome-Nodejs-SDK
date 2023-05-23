# PublishingMetadataPostErrors

**_properties:_**

| property              | type                              |
| --------------------- | --------------------------------- |
| errorCode             | string                            |
| assetId               | string                            |
| locale                | string                            |
| message               | string                            |


`errorCode` value can be one of the followings:
- `canonical-link-error`
- `unknown-asset`
- `metadata-exists`
- `duplicate-metadata`
- `invalid-status`
- `missing-public-url`
- `public-url-not-allowed`
- `domain-not-whitelisted`
- `missing-publishing-destination-updated-at`
- `publishing-destination-updated-at-not-allowed`
- `missing-locale`
- `locale-not-allowed`
