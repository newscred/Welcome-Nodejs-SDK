import { APICaller } from "../../modules/api-caller";
import { Folder } from "./folder";
import { FolderListData, IFolderList } from "./types";
import { ListData } from "../base-list-data";

export class FolderList extends ListData implements IFolderList {
  data: Array<Folder>;
  constructor(data: FolderListData, apiCaller: APICaller, tokenGetParam?: any) {
    super(data, apiCaller, tokenGetParam);
    this.data = data.data.map(
      (folder) => new Folder(folder, apiCaller, tokenGetParam)
    );
  }
}
