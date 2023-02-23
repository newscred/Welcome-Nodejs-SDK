import { BriefBase, BriefBaseData } from "./brief";

export interface CampaignBriefData extends BriefBaseData {
  links: {
    self: string;
    campaign: string;
  };
}

export class CampaignBrief extends BriefBase {
  #links: CampaignBriefData["links"];

  constructor(data: CampaignBriefData) {
    const { links, ...baseData } = data;
    super(baseData);
    this.#links = links;
  }

  getRelatedLinks() {
    return this.#links;
  }
}
