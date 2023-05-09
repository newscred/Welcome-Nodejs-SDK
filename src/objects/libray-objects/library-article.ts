import { LibraryArticleData, ILibraryArticle } from "./types";
import { LabelResponse } from "../common/types";

export class LibraryArticle implements ILibraryArticle {
  createdAt!: Date;
  modifiedAt!: Date;
  expiresAt!: Date | null;
  id!: string;
  title!: string;
  folderId!: string | null;
  fileLocation!: string;
  ownerOrganizationId!: string;
  htmlBody!: string;
  labels!: LabelResponse[];
  groupId!: string | null;
  metaTitle!: string | null;
  metaDescription!: string | null;
  metaUrl!: string | null;
  metaKeywords!: string[];
  sourceArticle!: string | null;
  url!: string | null;
  authors!: { name: string | null }[];
  langCode!: string | null;
  pixelKey!: string;
  images!: {
    attributionText: string | null;
    caption: string;
    description: string | null;
    mimeType: string;
    source: { name: string | null };
    url: string;
    height: number;
    width: number;
    thumbnail: string | null;
  };

  constructor(data: LibraryArticleData) {
    const {createdAt, modifiedAt, expiresAt, ...other} = data;
    Object.assign(this, other);
    this.createdAt = new Date(createdAt);
    this.modifiedAt = new Date(modifiedAt)
    this.expiresAt = expiresAt ? new Date(expiresAt) : null;
  }

  toJSON() {
    return {
      ...this,
      createdAt: this.createdAt.toISOString(),
      modifiedAt: this.modifiedAt.toISOString(),
      expiresAt: this.expiresAt ? this.expiresAt.toISOString() : null,
    };
  }
}
