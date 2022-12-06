import { ListData } from "../base-list-data";
import { PaginatedResponse, LabelResponse } from "../common/types";

export interface FolderData {
  id: string;
  name: string;
  parentFolderId: string | null;
  path: string;
  createdAt: string;
  modifiedAt: string;
  links: {
    self: string;
    parentFolder: string | null;
    childFolders: string;
    assets: string;
  };
}

export interface FolderListData extends PaginatedResponse {
  data: Array<FolderData>;
}

export interface IFolder
  extends Omit<FolderData, "createdAt" | "modifiedAt" | "links"> {
  createdAt: Date;
  modifiedAt: Date;
  getChildFolders: () => Promise<IFolderList>;
  getParentFolder: () => Promise<IFolder | null>;
  getRelatedLinks: () => FolderData["links"];
}

export interface IFolderList extends ListData {
  data: Array<IFolder>;
}

export interface LibraryArticleData {
  id: string;
  title: string;
  folderId: string | null;
  fileLocation: string;
  ownerOrganizationId: string;
  htmlBody: string;
  labels: LabelResponse[];
  groupId: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  metaUrl: string | null;
  metaKeywords: string[];
  sourceArticle: string | null;
  url: string | null;
  authors: {
    name: string | null;
  }[];
  langCode: string | null;
  pixelKey: string;
  images: {
    attributionText: string | null;
    caption: string;
    description: string | null;
    mimeType: string;
    source: {
      name: string | null;
    };
    url: string;
    height: number;
    width: number;
    thumbnail: string | null;
  };
  createdAt: string;
  modifiedAt: string;
  expiresAt: string | null;
}

export interface ILibraryArticle
  extends Omit<LibraryArticleData, "createdAt" | "modifiedAt" | "expiresAt"> {
  createdAt: Date;
  modifiedAt: Date;
  expiresAt: Date | null;
}

export interface LibraryVideoData {
  id: string;
  title: string;
  description: string | null;
  mimeType: string;
  fileSize: number;
  folderId: string | null;
  fileLocation: string;
  isPublic: boolean;
  url: string;
  labels: LabelResponse[];
  ownerOrganizationId: string;
  createdAt: string;
  modifiedAt: string;
  expiresAt: string | null;
}

export interface ILibraryVideo
  extends Omit<LibraryVideoData, "createdAt" | "modifiedAt" | "expiresAt"> {
  createdAt: Date;
  modifiedAt: Date;
  expiresAt: Date | null;
}

export interface LibraryImageData {
  id: string;
  title: string;
  description: string | null;
  mimeType: string;
  fileSize: number;
  imageResolution: {
    height: number;
    width: number;
  };
  folderId: string | null;
  fileLocation: string;
  isPublic: boolean;
  url: string;
  labels: LabelResponse[];
  ownerOrganizationId: string;
  createdAt: string;
  modifiedAt: string;
  expiresAt: string | null;
}

export interface ILibraryImage
  extends Omit<LibraryImageData, "createdAt" | "modifiedAt" | "expiresAt"> {
  createdAt: Date;
  modifiedAt: Date;
  expiresAt: Date | null;
}

export interface LibraryRawFileData {
  id: string;
  title: string;
  description: string | null;
  mimeType: string;
  fileSize: number;
  folderId: string | null;
  fileLocation: string;
  isPublic: boolean;
  url: string;
  labels: LabelResponse[];
  ownerOrganizationId: string;
  createdAt: string;
  modifiedAt: string;
  expiresAt: string | null;
}

export interface ILibraryRawFile
  extends Omit<LibraryRawFileData, "createdAt" | "modifiedAt" | "expiresAt"> {
  createdAt: Date;
  modifiedAt: Date;
  expiresAt: Date | null;
}

export interface LibraryAssetData {
  id: string;
  title: string;
  folderId: string | null;
  fileLocation: string;
  ownerOrganizationId: string;
  type: "article" | "image" | "video" | "raw_file" | "structured_content";
  mimeType: string;
  content: {
    type: "url" | "api_url" | "html_body";
    value: string;
  };
  createdAt: string;
  modifiedAt: string;
  links: {
    self: string;
  };
}

export interface ILibraryAsset
  extends Omit<LibraryAssetData, "createdAt" | "modifiedAt" | "links"> {
  createdAt: Date;
  modifiedAt: Date;
  getRelatedLinks: () => LibraryAssetData["links"];
}

export interface LibraryAssetListData extends PaginatedResponse {
  data: Array<LibraryAssetData>;
}

export interface ILibraryAssetList extends ListData {
  data: Array<ILibraryAsset>;
}

export interface LibraryAssetVersionData {
  versionNumber: number;
  assetId: string;
  title: string;
  type: "image" | "video" | "raw_file";
  mimeType: string;
  createdAt: string;
  content: {
    type: "url";
    value: string;
  };
  links: {
    asset: string;
  };
}

export interface ILibraryAssetVersion
  extends Omit<LibraryAssetVersionData, "createdAt" | "links"> {
  createdAt: Date;
  getRelatedLinks: () => LibraryAssetVersionData["links"];
}
