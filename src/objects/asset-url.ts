export interface AssetUrlData {
  id: string;
  url: string;
}

export interface AssetUrl extends AssetUrlData {}
export class AssetUrl {
  constructor(data: AssetUrlData) {
    Object.assign(this, data);
  }
}
