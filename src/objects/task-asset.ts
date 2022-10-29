import { APICaller } from "../modules/api-caller";
import { AssetBase, AssetBaseData } from "./base-asset";

export interface TaskAssetData extends AssetBaseData {
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

export class TaskAsset extends AssetBase {
  #apiCaller: APICaller;
  #tokenGetParam: any;
  #links: TaskAssetData["links"];

  constructor(data: TaskAssetData, apiCaller: APICaller, tokenGetParam?: any) {
    super(data);
    this.#apiCaller = apiCaller;
    this.#tokenGetParam = tokenGetParam;
    this.#links = data.links;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      links: this.#links,
    };
  }

  async addDraft() {}

  async getComments() {}

  async addComment() {}
}
