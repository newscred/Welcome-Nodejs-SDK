export interface IPublishingMetadataForAssetData {
  id: string;
  assetId: string;
  assetType: "article" | "image" | "video" | "raw_file" | "structured_content";
  status: "published" | "unpublished" | "synced" | "failed" | null;
  statusMessage: string | null;
  locale: string | null;
  publicUrl: string | null;
  publishingDestinationUpdatedAt: string | null;
  links: {
    self: string;
    publishingEvent: string;
    asset: string;
  };
}

export class PublishingMetadataForAsset {
  #links: IPublishingMetadataForAssetData["links"];
  id!: string;
  assetId!: string;
  assetType!: IPublishingMetadataForAssetData["assetType"];
  status!: IPublishingMetadataForAssetData["status"];
  statusMessage!: string;
  locale!: string;
  publicUrl!: string;
  publishingDestinationUpdatedAt: Date | null;
  constructor(data: IPublishingMetadataForAssetData) {
    const { links, publishingDestinationUpdatedAt, ...other } = data;
    Object.assign(this, other);
    this.#links = links;
    this.publishingDestinationUpdatedAt = publishingDestinationUpdatedAt
      ? new Date(publishingDestinationUpdatedAt)
      : null;
  }
  getRelatedLinks() {
    return this.#links;
  }

  toJSON() {
    return {
      ...this,
      publishingDestinationUpdatedAt: this.publishingDestinationUpdatedAt
        ? this.publishingDestinationUpdatedAt.toISOString()
        : null,
    };
  }
}
