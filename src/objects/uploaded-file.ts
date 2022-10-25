import { APICaller } from "../modules/api-caller";

export class UploadedFile {
  #apiCaller: APICaller;
  #key: string;
  #tokenGetParam: any;
  title: string;

  constructor(apiCaller: any, key: string, title?: string, tokenGetParam?: any) {
    this.#apiCaller = apiCaller;
    this.#key = key;
    this.title = title || "(no title)";
    this.#tokenGetParam = tokenGetParam;
  }

  async createAsset() {
    const asset = await this.#apiCaller.post(
      "/assets",
      {
        key: this.#key,
        title: this.title,
      },
      this.#tokenGetParam
    );
    // TODO: return Asset object
    return asset;
  }

  async addAsAssetVersion(assetId: string) {
    const asset = await this.#apiCaller.post(
      `/assets/${assetId}/versions`,
      {
        key: this.#key,
        title: this.title,
      },
      this.#tokenGetParam
    );
    // TODO: return Asset object
    return asset;
  }

  async addAsTaskAsset(taskId: string) {
    const asset = await this.#apiCaller.post(
      `/tasks/${taskId}/assets`,
      {
        key: this.#key,
        title: this.title,
      },
      this.#tokenGetParam
    );
    // TODO: return TaskAsset object
    return asset;
  }

  async addAsTaskAssetDraft(taskId: string, assetId: string) {
    const asset = await this.#apiCaller.post(
      `/tasks/${taskId}/assets/${assetId}/drafts`,
      {
        key: this.#key,
        title: this.title,
      },
      this.#tokenGetParam
    );
    // TODO: return TaskAsset object
    return asset;
  }
}
