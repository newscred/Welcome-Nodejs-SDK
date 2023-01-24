import { APICaller } from "../../modules/api-caller";
import { LibraryAsset } from "./library-asset";
import { LibraryAssetListData, ILibraryAssetList } from "./types";
import { ListData } from "../base-list-data";

export class LibraryAssetList extends ListData implements ILibraryAssetList {
  data: Array<LibraryAsset>;
  constructor(
    data: LibraryAssetListData,
    apiCaller: APICaller,
    tokenGetParam?: any
  ) {
    super(data, apiCaller, tokenGetParam);
    this.data = data.data.map((asset) => new LibraryAsset(asset));
  }
}
