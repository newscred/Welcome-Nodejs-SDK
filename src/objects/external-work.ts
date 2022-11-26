import { APICaller } from "../modules/api-caller";

interface Common {
  identifier: string | null;
  title: string | null;
  status: string | null;
  url: string | null;
  externalSystem: string;
}
export interface ExternalWorkData extends Common {
  links: {
    self: string;
  };
}

export interface ExternalWork extends Common {}
export class ExternalWork {
  #apiCaller: APICaller;
  #tokenGetParam: any;
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

  #loadData(data: ExternalWorkData) {
    const { links, ...other } = data;
    this.#links = links;
    Object.assign(this, other);
  }

  getRelatedLinks() {
    return this.#links;
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
