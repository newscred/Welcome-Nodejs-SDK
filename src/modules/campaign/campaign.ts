import { APICaller } from "../api-caller";
import { Campaign as CampaignObject } from "../../objects/campaign";
import { CampaignBrief as CampaignBriefObject } from "../../objects/brief";

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
      campaignData,
      this.#apiCaller,
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
      campaignBriefData,
      this.#apiCaller,
      tokenGetParam
    );
    return campaignBrief;
  }
}
