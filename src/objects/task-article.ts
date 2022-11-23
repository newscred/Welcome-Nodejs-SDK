export interface TaskArticleData {
  id: string;
  title: string;
  createdAt: string;
  modifiedAt: string;
  htmlBody: string;
  url: string | null;
  labels: LabelResponse[];
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

export class TaskArticle {
  #id: string;
  #title: string;
  #createdAt: Date;
  #modifiedAt: Date;
  #htmlBody: string;
  #url: string | null;
  #labels: LabelResponse[];
  #links: TaskArticleData["links"];

  constructor(data: TaskArticleData) {
    this.#id = data.id;
    this.#title = data.title;
    this.#createdAt = new Date(data.createdAt);
    this.#modifiedAt = new Date(data.modifiedAt);
    this.#htmlBody = data.htmlBody;
    this.#url = data.url;
    this.#labels = data.labels;
    this.#links = data.links;
  }
  get id() {
    return this.#id;
  }
  get title() {
    return this.#title;
  }
  get createdAt() {
    return this.#createdAt;
  }
  get modifiedAt() {
    return this.#modifiedAt;
  }
  get htmlBody() {
    return this.#htmlBody;
  }
  get url() {
    return this.#url;
  }
  get labels() {
    return this.#labels;
  }

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      createdAt: this.#createdAt.toISOString(),
      modifiedAt: this.#modifiedAt.toISOString(),
      htmlBody: this.#htmlBody,
      url: this.#url,
      labels: this.#labels,
      links: this.#links,
    };
  }
}
