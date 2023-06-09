import { APICaller } from "../modules/api-caller";
import { TaskAsset, TaskAssetData } from "./task-generic-asset";
import { ListData } from "./base-list-data";
import { PaginatedResponse } from "./common/types";

export interface TaskAssetListData extends PaginatedResponse {
  data: Array<TaskAssetData>;
}

export class TaskAssetList extends ListData {
  data: Array<TaskAsset>;
  constructor(
    data: TaskAssetListData,
    apiCaller: APICaller,
    tokenGetParam?: any
  ) {
    super(data, apiCaller, tokenGetParam);
    this.data = data.data.map(
      (taskAsset) => new TaskAsset(taskAsset, apiCaller, tokenGetParam)
    );
  }
}
