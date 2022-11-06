import { TaskAssetBase, TaskAssetBaseData } from "./base-task-asset";

export interface TaskVideoData extends TaskAssetBaseData {
  fileSize: number;
  url: string;
}

export class TaskVideo extends TaskAssetBase {
  #fileSize: number;
  #url: string;

  constructor(data: TaskVideoData) {
    super(data);
    this.#fileSize = data.fileSize;
    this.#url = data.url;
  }

  get fileSize() {
    return this.#fileSize;
  }
  get url() {
    return this.#url;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      fileSize: this.#fileSize,
      url: this.#url,
    };
  }
}
