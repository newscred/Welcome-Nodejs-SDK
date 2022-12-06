import { LabelResponse } from "./common/types";

interface Common {
  id: string;
  title: string;
  mimeType: string;
  labels: LabelResponse[];
}

export interface TaskAssetBaseData extends Common {
  createdAt: string;
  modifiedAt: string;
  links: {
    self: string;
    task: string;
    drafts: string | null;
    webUrls: {
      self: string;
      task: string;
      drafts: string | null;
    };
  };
}

export interface TaskAssetBase extends Common {
  createdAt: Date;
  modifiedAt: Date;
}
export class TaskAssetBase {
  #links: TaskAssetBaseData["links"];

  constructor(data: TaskAssetBaseData) {
    const { createdAt, modifiedAt, links, ...other } = data;
    this.createdAt = new Date(createdAt);
    this.modifiedAt = new Date(modifiedAt);
    this.#links = links;
    Object.assign(this, other);
  }

  getRelatedLinks() {
    return this.#links;
  }

  toJSON() {
    return {
      ...this,
      createdAt: this.createdAt.toISOString(),
      modifiedAt: this.modifiedAt.toISOString(),
    };
  }
}
