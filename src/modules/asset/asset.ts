import { APICaller } from "../api-caller";
import { AssetUrl as AssetUrlModel } from "../../objects/asset-url";

export class Asset {
  #apiCaller: APICaller;

  constructor(apiCaller: APICaller) {
    this.#apiCaller = apiCaller;
  }

  async getAssetById(assetId: string, tokenGetParam?: any) {
    const assetData: any = await this.#apiCaller.get(
      `/asset-urls/${assetId}`,
      tokenGetParam
    );

    const asset = new AssetUrlModel(assetData);
    return asset;
  }
}
