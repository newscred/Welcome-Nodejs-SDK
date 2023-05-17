import { LibraryAssetData, ILibraryAsset } from "./types";

export class LibraryAsset implements ILibraryAsset {
  #links: {
    self: string;
  };
  createdAt: Date;
  modifiedAt: Date;
  id!: string;
  title!: string;
  folderId!: string | null;
  fileLocation!: string;
  ownerOrganizationId!: string;
  type!: "article" | "image" | "video" | "raw_file" | "structured_content";
  mimeType!: string;
  content!: { type: "url" | "api_url" | "html_body"; value: string };
  thumbnailUrl!: string;

  constructor(data: LibraryAssetData) {
    const { createdAt, modifiedAt, links, ...other } = data;
    Object.assign(this, other);
    this.#links = data.links;
    this.createdAt = new Date(data.createdAt);
    this.modifiedAt = new Date(data.modifiedAt);
  }

  getRelatedLinks() {
    return this.#links;
  }

  toJSON() {
    return {
      ...this,
      createdAt: this.createdAt.toISOString(),
      modifiedAt: this.modifiedAt.toISOString(),
    };
  }
}
