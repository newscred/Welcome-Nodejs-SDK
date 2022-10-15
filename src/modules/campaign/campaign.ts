import { APICaller } from "../api-caller";
import { Campaign as CampaignObject } from "../../objects/campaign";
import { CampaignBrief as CampaignBriefObject } from "../../objects/campaign-brief";

export class Campaign {
  #apiCaller: APICaller;

  constructor(apiCaller: APICaller) {
    this.#apiCaller = apiCaller;
  }

  async getCampaignById(campaignId: string, tokenGetParam?: any) {
    const campaignData: any = await this.#apiCaller.get(
      `/campaigns/${campaignId}`,
      tokenGetParam
    );
    const campaign = new CampaignObject(
      this.#apiCaller,
      campaignData,
      tokenGetParam
    );
    return campaign;
  }

  async getCampaignBrief(campaignId: string, tokenGetParam?: any) {
    const campaignBriefData: any = await this.#apiCaller.get(
      `/campaigns/${campaignId}/brief`,
      tokenGetParam
    );
    const campaignBrief = new CampaignBriefObject(
      this.#apiCaller,
      campaignBriefData,
      tokenGetParam
    );
    return campaignBrief;
  }
}
