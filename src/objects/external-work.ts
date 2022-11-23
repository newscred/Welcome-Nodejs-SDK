import { APICaller } from "../modules/api-caller";

export interface ExternalWorkData {
  identifier: string | null;
  title: string | null;
  status: string | null;
  url: string | null;
  externalSystem: string;
  links: {
    self: string;
  };
}

export class ExternalWork {
  #apiCaller: APICaller;
  #tokenGetParam: any;

  #identifier!: string | null;
  #title!: string | null;
  #status!: string | null;
  #url!: string | null;
  #externalSystem!: string;
  #links!: {
    self: string;
  };

  constructor(
    data: ExternalWorkData,
    apiCaller: APICaller,
    tokenGetParam?: any
  ) {
    this.#apiCaller = apiCaller;
    this.#tokenGetParam = tokenGetParam;
    this.#loadData(data);
  }

  get identifier() {
    return this.#identifier;
  }
  get title() {
    return this.#title;
  }
  get status() {
    return this.#status;
  }
  get url() {
    return this.#url;
  }
  get externalSystem() {
    return this.#externalSystem;
  }

  #loadData(data: ExternalWorkData) {
    this.#identifier = data.identifier;
    this.#title = data.title;
    this.#status = data.status;
    this.#url = data.url;
    this.#externalSystem = data.externalSystem;
    this.#links = data.links;
  }
  toJSON() {
    return {
      identifier: this.#identifier,
      title: this.#title,
      status: this.#status,
      url: this.#url,
      externalSystem: this.#externalSystem,
      links: this.#links,
    };
  }

  async update(payload: {
    identifier?: string | null;
    title?: string | null;
    status?: string | null;
    url?: string | null;
  }) {
    const response = await this.#apiCaller.patch(
      this.#links.self,
      payload,
      this.#tokenGetParam
    );
    this.#loadData(response as ExternalWorkData);
  }
}
