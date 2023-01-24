import { Folder } from "./folder";
import { FolderList } from "./folder-list";

Folder.prototype.getChildFolders = async function (): Promise<FolderList> {
  return this._getChildFolders(FolderList);
};

export { Folder, FolderList };
export { LibraryArticle } from "./library-article";
export { LibraryAsset } from "./library-asset";
export { LibraryAssetList } from "./library-asset-list";
export { LibraryImage } from "./library-image";
export { LibraryRawFile } from "./library-raw-file";
export { LibraryVideo } from "./library-video";
export { LibraryAssetVersion } from "./library-asset-version";
