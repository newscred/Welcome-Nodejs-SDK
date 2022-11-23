export interface TaskAssetBaseData {
  id: string;
  title: string;
  mimeType: string;
  createdAt: string;
  modifiedAt: string;
  labels: LabelResponse[];
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

export class TaskAssetBase {
  #id: string;
  #title: string;
  #mimeType: string;
  #createdAt: Date;
  #modifiedAt: Date;
  #labels: LabelResponse[];
  #links: TaskAssetBaseData["links"];

  constructor(data: TaskAssetBaseData) {
    this.#id = data.id;
    this.#title = data.title;
    this.#mimeType = data.mimeType;
    this.#createdAt = new Date(data.createdAt);
    this.#modifiedAt = new Date(data.modifiedAt);
    this.#labels = data.labels;
    this.#links = data.links;
  }

  get id() {
    return this.#id;
  }
  get title() {
    return this.#title;
  }
  get mimeType() {
    return this.#mimeType;
  }
  get createdAt() {
    return this.#createdAt;
  }
  get modifiedAt() {
    return this.#modifiedAt;
  }
  get labels() {
    return this.#labels;
  }

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      mimeType: this.#mimeType,
      createdAt: this.#createdAt.toISOString(),
      modifiedAt: this.#modifiedAt.toISOString(),
      labels: this.#labels,
      links: this.#links,
    };
  }
}
