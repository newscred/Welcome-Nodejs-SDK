import { APICaller } from "../modules/api-caller";
import { TaskAsset, TaskAssetData } from "./task-asset";
import { ListData } from "./base-list-data";

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
