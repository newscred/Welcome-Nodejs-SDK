import { TaskAssetBase, TaskAssetBaseData } from "./base-task-asset";

export interface TaskImageData extends TaskAssetBaseData {
  fileSize: number;
  imageResolution: {
    height: number;
    width: number;
  };
  url: string;
}

export class TaskImage extends TaskAssetBase {
  fileSize: number;
  imageResolution: {
    height: number;
    width: number;
  };
  url: string;

  constructor(data: TaskImageData) {
    super(data);
    this.fileSize = data.fileSize;
    this.imageResolution = data.imageResolution;
    this.url = data.url;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      ...this,
    };
  }
}
