import { LibraryAssetVersionData, ILibraryAssetVersion } from "./types";

export class LibraryAssetVersion implements ILibraryAssetVersion {
  #links: LibraryAssetVersionData["links"];
  createdAt: Date;
  versionNumber!: number;
  assetId!: string;
  title!: string;
  type!: "image" | "video" | "raw_file";
  mimeType!: string;
  content!: { type: "url"; value: string };

  constructor(data: LibraryAssetVersionData) {
    const { createdAt, links, ...other } = data;
    Object.assign(this, other);
    this.#links = data.links;
    this.createdAt = new Date(data.createdAt);
  }

  getRelatedLinks() {
    return this.#links;
  }

  toJSON() {
    return {
      ...this,
      createdAt: this.createdAt.toISOString(),
    };
  }
}
