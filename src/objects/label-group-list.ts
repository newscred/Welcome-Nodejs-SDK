import { APICaller } from "../modules/api-caller";
import { LabelGroup } from "./label-group";

interface LabelGroupListData {
  data: Array<LabelGroup>;
  pagination: {
    next: string | null;
    previous: string | null;
  };
}

export class LabelGroupList {
  #apiCaller: APICaller;
  #tokenGetParam: any;
  #pagination: {
    next: string | null;
    previous: string | null;
  };
  data: Array<LabelGroup>;

  constructor(
    data: LabelGroupListData,
    apiCaller: APICaller,
    tokenGetParam?: any
  ) {
    this.#apiCaller = apiCaller;
    this.#tokenGetParam = tokenGetParam;
    this.data = data.data.map((labelGroup) => new LabelGroup(labelGroup));
    this.#pagination = data.pagination;
  }

  async getNextBatch() {
    if (!this.#pagination.next) {
      return null;
    }
    const nextBatchData: any = await this.#apiCaller.get(
      this.#pagination.next,
      this.#tokenGetParam
    );

    const nextLabelGroupList = new LabelGroupList(
      nextBatchData,
      this.#apiCaller,
      this.#tokenGetParam
    );

    return nextLabelGroupList;
  }

  async getPreviousBatch() {
    if (!this.#pagination.previous) {
      return null;
    }
    const previousBatchData: any = await this.#apiCaller.get(
      this.#pagination.previous,
      this.#tokenGetParam
    );
    const nextLabelGroupList = new LabelGroupList(
      previousBatchData,
      this.#apiCaller,
      this.#tokenGetParam
    );
    return nextLabelGroupList;
  }
}
