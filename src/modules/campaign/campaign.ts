import { APICaller } from "../api-caller";
import {
  Campaign as CampaignObject,
  CampaignData,
} from "../../objects/campaign";
import {
  CampaignBrief as CampaignBriefObject,
  CampaignBriefData,
} from "../../objects/campaign-brief";

export class Campaign {
  #apiCaller: APICaller;

  constructor(apiCaller: APICaller) {
    this.#apiCaller = apiCaller;
  }

  async getCampaignById(campaignId: string, tokenGetParam?: any) {
    const campaignData = (await this.#apiCaller.get(
      `/campaigns/${campaignId}`,
      tokenGetParam
    )) as CampaignData;
    const campaign = new CampaignObject(
      campaignData,
      this.#apiCaller,
      tokenGetParam
    );
    return campaign;
  }

  async getCampaignBrief(campaignId: string, tokenGetParam?: any) {
    const campaignBriefData = (await this.#apiCaller.get(
      `/campaigns/${campaignId}/brief`,
      tokenGetParam
    )) as CampaignBriefData;
    const campaignBrief = new CampaignBriefObject(campaignBriefData);
    return campaignBrief;
  }
}
