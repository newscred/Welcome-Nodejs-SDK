import { APICaller } from "../modules/api-caller";

interface UploadedFileData {
  key: string;
  title?: string;
}
export class UploadedFile {
  #apiCaller: APICaller;
  #tokenGetParam: any;
  #key: string;
  title: string;

  constructor(
    data: UploadedFileData,
    apiCaller: APICaller,
    tokenGetParam?: any
  ) {
    this.#apiCaller = apiCaller;
    this.#key = data.key;
    this.title = data.title || "(no title)";
    this.#tokenGetParam = tokenGetParam;
  }

  get key() {
    return this.#key;
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
    // TODO: return TaskAssetDraft object
    return asset;
  }
}
