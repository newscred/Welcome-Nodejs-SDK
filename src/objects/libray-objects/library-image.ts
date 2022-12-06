import { LibraryImageData, ILibraryImage } from "./types";
import { LabelResponse } from "../common/types";

export class LibraryImage implements ILibraryImage {
  createdAt: Date;
  modifiedAt: Date;
  expiresAt: Date | null;
  id!: string;
  title!: string;
  description!: string | null;
  mimeType!: string;
  fileSize!: number;
  imageResolution!: { height: number; width: number };
  folderId!: string | null;
  fileLocation!: string;
  isPublic!: boolean;
  url!: string;
  labels!: LabelResponse[];
  ownerOrganizationId!: string;

  constructor(data: LibraryImageData) {
    const { createdAt, modifiedAt, expiresAt, ...other } = data;
    Object.assign(this, other);
    this.createdAt = new Date(data.createdAt);
    this.modifiedAt = new Date(data.modifiedAt);
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
