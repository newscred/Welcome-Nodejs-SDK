import { IPublishingMetadataForAssetData } from "../../objects/publishing-metadata-for-asset";
import { AddPostMetadataErrorCodeEnum } from "./enums";

export interface IAddPublishingMetadataPayload {
  data: {
    assetId: string;
    status: "published" | "unpublished" | "synced" | "failed";
    statusMessage?: string;
    locale?: string;
    publicUrl?: string;
    publishingDestinationUpdatedAt?: string;
  };
}

export interface IAddPostMetadataResponse {
  data: IPublishingMetadataForAssetData[];
  errors: {
    errorCode: AddPostMetadataErrorCodeEnum;
    assetId: string;
    locale: string;
    message: string;
  }[];
}
