import { APICaller } from "../modules/api-caller";
// Warning! CIRCULAR DEPENDECY
import { Campaign } from "./campaign";

interface CampaignBriefData {
  type: string;
  title: string;
  template: {
    id: string;
    name: string;
  } | null;
  fields: Array<{ name: string; value: string }>;
  links: {
    campaign: string;
  };
}

export interface CampaignBrief extends CampaignBriefData {}
export class CampaignBrief {
  #apiCaller: APICaller;
  #tokenGetParam: any;

  constructor(
    apiCaller: APICaller,
    data: CampaignBriefData,
    tokenGetParam?: any
  ) {
    this.#apiCaller = apiCaller;
    this.#tokenGetParam = tokenGetParam;
    Object.assign(this, data);
  }

  async getCampaign() {
    const campaignData: any = await this.#apiCaller.get(
      this.links.campaign,
      this.#tokenGetParam
    );
    const campaign = new Campaign(
      this.#apiCaller,
      campaignData,
      this.#tokenGetParam
    );
    return campaign;
  }
}
