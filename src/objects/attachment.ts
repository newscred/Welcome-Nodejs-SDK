export interface AttachmentData {
  id: string;
  name: string;
  url: string;
}

export class Attachment {
  #id: string;
  #name: string;
  #url: string;

  constructor(data: AttachmentData) {
    this.#id = data.id;
    this.#name = data.name;
    this.#url = data.url;
  }
  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get url() {
    return this.#url;
  }
  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      url: this.#url,
    };
  }
}
