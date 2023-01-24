import { APICaller } from "../modules/api-caller";



export class ListData {
  #apiCaller: APICaller;
  #tokenGetParam: any;
  #pagination: {
    next: string | null;
    previous: string | null;
  };

  constructor(data: PaginatedResponse, apiCaller: APICaller, tokenGetParam?: any) {
    this.#apiCaller = apiCaller;
    this.#tokenGetParam = tokenGetParam;
    this.#pagination = data.pagination;
  }

  async getNextBatch(): Promise<this | null> {
    if (!this.#pagination.next) {
      return null;
    }
    const nextBatchData = await this.#apiCaller.get(
      this.#pagination.next,
      this.#tokenGetParam
    );

    const nextBatch: this = new (<any>this.constructor)(
      nextBatchData,
      this.#apiCaller,
      this.#tokenGetParam
    );
    return nextBatch;
  }

  async getPreviousBatch(): Promise<this | null> {
    if (!this.#pagination.previous) {
      return null;
    }
    const previousBatchData = await this.#apiCaller.get(
      this.#pagination.previous,
      this.#tokenGetParam
    );
    const previousBatch: this = new (<any>this.constructor)(
      previousBatchData,
      this.#apiCaller,
      this.#tokenGetParam
    );
    return previousBatch;
  }
}
