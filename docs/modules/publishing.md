# Publishing

The `publishing` module provides functionality to work with webhook publishing. The module provides the following methods.

## `getPublishingEventById` <img src="../experimental-badge.svg" alt="experimental-badge" />

**_parameters:_**

- eventId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[PublishingEvent](../objects/PublishingEvent.md)>

Gets the event with the provided ID.

## `getPublishingMetadata` <img src="../experimental-badge.svg" alt="experimental-badge" />

**_parameters:_**

- eventId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<{ data: [PublishingMetadataForAsset](../objects/PublishingMetadataForAsset.md)[] }>

Gets the publishing metadata for the event with the provided ID.

## `addPublishingMetadata` <img src="../experimental-badge.svg" alt="experimental-badge" />

**_parameters:_**

- eventId: string
- payload: object
- tokenGetParam: any (optional)

**_returns:_** Promise<[PublishingMetadataPostResponse](../objects/PublishingMetadataPostResponse.md)>

Adds the publishing metadata for the event with the provided event id. The second parameter `payload` contains the publishing metadata to be added. The payload object has the following structure,

```pre
{
  data: Array<{
    assetId: string,
    status: "published" | "unpublished" | "synced" | "failed",
    statusMessage: string, // optional
    locale: string, // optional
    publicUrl: string, // optional
    publishingDestinationUpdatedAt: string, // optional
  }>
}
```

## `getPublishingMetadataForAsset` <img src="../experimental-badge.svg" alt="experimental-badge" />

**_parameters:_**

- eventId: string
- assetId: string
- metadataId: string
- tokenGetParam: any (optional)

**_returns:_** Promise<[PublishingMetadataForAsset](../objects/PublishingMetadataForAsset.md)>

Gets the publishing metadata of an asset for the event with the provided event ID.
