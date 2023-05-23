interface IPublishingMetadata {
  id: string;
  links: {
    self: string;
  };
}

class PublishingMetadata {
  #links: IPublishingMetadata["links"];
  id: string;

  constructor(data: IPublishingMetadata) {
    this.#links = data.links;
    this.id = data.id;
  }
  getRelatedLinks() {
    return this.#links;
  }
}

interface IAsset {
  id: string;
  type: "article" | "image" | "video" | "raw_file" | "structured_content";
  publishingMetadata: IPublishingMetadata[];
  links: {
    self: string;
  };
}

class Asset {
  #links: IAsset["links"];
  id: string;
  type: IAsset["type"];
  publishingMetadata: PublishingMetadata[];
  constructor(data: IAsset) {
    this.#links = data.links;
    this.id = data.id;
    this.type = data.type;
    this.publishingMetadata = data.publishingMetadata.map(
      (pubMetadata) => new PublishingMetadata(pubMetadata)
    );
  }
  getRelatedLinks() {
    return this.#links;
  }
}

export interface IPublishingEventData {
  id: string;
  assets: IAsset[];

  links: {
    self: string;
    publishingMetadata: string;
  };
}

export class PublishingEvent {
  #links: IPublishingEventData["links"];
  id: string;
  assets: Asset[];
  constructor(data: IPublishingEventData) {
    this.#links = data.links;
    this.id = data.id;
    this.assets = data.assets.map((ast) => new Asset(ast));
  }
  getRelatedLinks() {
    return this.#links;
  }
}
