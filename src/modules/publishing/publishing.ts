import { APICaller } from "../api-caller";
import {
  IPublishingEventData,
  PublishingEvent,
} from "../../objects/publishing-event";
import {
  IPublishingMetadataForAssetData,
  PublishingMetadataForAsset,
} from "../../objects/publishing-metadata-for-asset";
import { warnAboutUsingExperimentalAPI } from "../../util";
import {
  IAddPostMetadataResponse,
  IAddPublishingMetadataPayload,
} from "./types";

export class Publishing {
  #apiCaller: APICaller;
  constructor(apiCaller: APICaller) {
    this.#apiCaller = apiCaller;
  }

  async getPublishingEventById(eventId: string, tokenGetParam?: any) {
    warnAboutUsingExperimentalAPI();
    const eventData = await this.#apiCaller.get(
      `/publishing-events/${eventId}`,
      tokenGetParam
    );
    return new PublishingEvent(eventData as IPublishingEventData);
  }

  async getPublishingMetadata(eventId: string, tokenGetParam?: any) {
    warnAboutUsingExperimentalAPI();
    const data = await this.#apiCaller.get(
      `/publishing-events/${eventId}/publishing-metadata`,
      tokenGetParam
    );
    return {
      data: (data as {data: IPublishingMetadataForAssetData[]}).data.map(
        (pmd) => new PublishingMetadataForAsset(pmd)
      ),
    };
  }

  async addPublishingMetadata(
    eventId: string,
    payload: IAddPublishingMetadataPayload,
    tokenGetParam?: any
  ) {
    warnAboutUsingExperimentalAPI();
    const data = (await this.#apiCaller.post(
      `/publishing-events/${eventId}/publishing-metadata`,
      payload,
      tokenGetParam
    )) as IAddPostMetadataResponse;

    return {
      data: data.data.map((pmd) => new PublishingMetadataForAsset(pmd)),
      error: data.errors,
    };
  }

  async getPublishingMetadataForAsset(
    eventId: string,
    assetId: string,
    metadataId: string,
    tokenGetParam?: any
  ) {
    warnAboutUsingExperimentalAPI();
    const data = await this.#apiCaller.get(
      `/publishing-events/${eventId}/assets/${assetId}/publishing-metadata/${metadataId}`,
      tokenGetParam
    );
    return new PublishingMetadataForAsset(
      data as IPublishingMetadataForAssetData
    );
  }
}
