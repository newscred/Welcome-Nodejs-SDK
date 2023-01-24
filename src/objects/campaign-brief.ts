import { APICaller } from "../modules/api-caller";
import { BriefBase, BriefBaseData } from "./brief";
import { Campaign, CampaignData } from "./campaign";

export interface CampaignBriefData extends BriefBaseData {
  links: {
    self: string;
    campaign: string;
  };
}

export class CampaignBrief extends BriefBase {
  #apiCaller: APICaller;
  #tokenGetParam: any;
  #links: CampaignBriefData["links"];

  constructor(
    data: CampaignBriefData,
    apiCaller: APICaller,
    tokenGetParam?: any
  ) {
    const { links, ...baseData } = data;
    super(baseData);
    this.#apiCaller = apiCaller;
    this.#tokenGetParam = tokenGetParam;
    this.#links = links;
  }

  getRelatedLinks() {
    return this.#links;
  }

  async getCampaign() {
    const campaignData = (await this.#apiCaller.get(
      this.#links.campaign,
      this.#tokenGetParam
    )) as CampaignData;
    const campaign = new Campaign(
      campaignData,
      this.#apiCaller,
      this.#tokenGetParam
    );
    return campaign;
  }
}
