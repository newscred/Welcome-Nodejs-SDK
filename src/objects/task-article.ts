import { LabelResponse } from "./common/types";

interface Common {
  id: string;
  title: string;
  htmlBody: string;
  url: string | null;
  labels: LabelResponse[];
}

export interface TaskArticleData extends Common {
  createdAt: string;
  modifiedAt: string;
  links: {
    self: string;
    task: string;
    drafts: string | null;
    webUrls: {
      self: string;
      task: string;
      drafts: null;
    };
  };
}

export interface TaskArticle extends Common {
  createdAt: Date;
  modifiedAt: Date;
}

export class TaskArticle {
  #links: TaskArticleData["links"];

  constructor(data: TaskArticleData) {
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
