import { PaginationOption, LabelPayload } from "../../objects/common/types";

export interface GetFoldersOption extends PaginationOption {
  parentFolderId?: string;
}

export interface GetAssetsOption extends PaginationOption {
  type?: Array<
    "article" | "image" | "video" | "raw_file" | "structured_content"
  >;
  createdAt_From?: string;
  createdAt_To?: string;
  modifiedAt_From?: string;
  modifiedAt_To?: string;
  folderId?: string;
  includeSubfolderAssets?: boolean;
  searchText?: string;
}

interface AssetUpdatePayload {
  title?: string;
  isPublic?: boolean;
  expiresAt?: string | null;
  labels?: LabelPayload[];
}

export interface ImageUpdatePayload extends AssetUpdatePayload {}
export interface VideoUpdatePayload extends AssetUpdatePayload {}
export interface RawFileUpdatePayload extends AssetUpdatePayload {}
