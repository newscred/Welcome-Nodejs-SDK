export interface AssetBaseData {
  id: string;
  title: string;
  mimeType: string;
  createdAt: string;
  modifiedAt: string;
  content: {
    type: "url" | "api_url" | "html_body";
    value: string;
  };
  labels: LabelResponse[];
}

export class AssetBase {
  #id: string;
  #title: string;
  #mimeType: string;
  #createdAt: string;
  #modifiedAt: string;
  #content: {
    type: "url" | "api_url" | "html_body";
    value: string;
  };
  #labels: LabelResponse[];

  constructor(data: AssetBaseData) {
    this.#id = data.id;
    this.#title = data.title;
    this.#mimeType = data.mimeType;
    this.#createdAt = data.createdAt;
    this.#modifiedAt = data.modifiedAt;
    this.#content = data.content;
    this.#labels = data.labels;
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
  get content() {
    return this.#content;
  }
  get labels() {
    return this.#labels;
  }

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      mimeType: this.#mimeType,
      createdAt: this.#createdAt,
      modifiedAt: this.#modifiedAt,
      content: this.#content,
      labels: this.#labels,
    };
  }
}
