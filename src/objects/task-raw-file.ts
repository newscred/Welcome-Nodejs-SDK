import { TaskAssetBase, TaskAssetBaseData } from "./base-task-asset";

export interface TaskRawFileData extends TaskAssetBaseData {
  fileSize: number;
  url: string;
}

export class TaskRawFile extends TaskAssetBase {
  fileSize: number;
  url: string;

  constructor(data: TaskRawFileData) {
    super(data);
    this.fileSize = data.fileSize;
    this.url = data.url;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      ...this,
    };
  }
}
