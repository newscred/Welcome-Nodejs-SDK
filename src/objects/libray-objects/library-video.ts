import { LibraryVideoData, ILibraryVideo } from "./types";
import { LabelResponse } from "../common/types";

export class LibraryVideo implements ILibraryVideo {
  createdAt: Date;
  modifiedAt: Date;
  expiresAt: Date | null;
  id!: string;
  title!: string;
  description!: string | null;
  mimeType!: string;
  fileSize!: number;
  folderId!: string | null;
  fileLocation!: string;
  isPublic!: boolean;
  url!: string;
  labels!: LabelResponse[];
  ownerOrganizationId!: string;

  constructor(data: LibraryVideoData) {
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
