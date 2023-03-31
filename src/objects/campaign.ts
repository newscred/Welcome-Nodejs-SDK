import { APICaller } from "../modules/api-caller";
import { CampaignBrief, CampaignBriefData } from "./campaign-brief";
import { User } from "./user";
import { LabelResponse } from "./common/types";

interface Common {
  id: string;
  title: string;
  description: string | null;
  isHidden: boolean;
  referenceId: string;
  budget: {
    currencyCode: string;
    budgetedAmount: string;
  } | null;
  labels: LabelResponse[];
}

export interface CampaignData extends Common {
  startDate: string | null;
  endDate: string | null;
  links: {
    self: string;
    brief: string;
    owner: string;
    parentCampaign: string;
    childCampaigns: [string];
  };
}

export interface Campaign extends Common {}
export class Campaign {
  #apiCaller: APICaller;
  #tokenGetParam: any;
  startDate: Date | null;
  endDate: Date | null;
  #links: CampaignData["links"];

  constructor(data: CampaignData, apiCaller: APICaller, tokenGetParam?: any) {
    this.#apiCaller = apiCaller;
    this.#tokenGetParam = tokenGetParam;

    const { links, startDate, endDate, ...other } = data;
    this.#links = links;
    this.startDate = startDate ? new Date(startDate) : null;
    this.endDate = endDate ? new Date(endDate) : null;

    Object.assign(this, other);
  }

  getRelatedLinks() {
    return this.#links;
  }

  toJSON() {
    return {
      ...this,
      startDate: this.startDate ? this.startDate.toISOString() : null,
      endDate: this.endDate ? this.endDate.toISOString() : null,
    };
  }

  async getBrief() {
    if (this.#links.brief === null) return null;
    const campaignBriefData = await this.#apiCaller.get(
      this.#links.brief,
      this.#tokenGetParam
    );
    const campaignBrief = new CampaignBrief(campaignBriefData as CampaignBriefData);
    return campaignBrief;
  }

  async getOwner() {
    if (this.#links.owner === null) return null;
    const ownerData: any = await this.#apiCaller.get(
      this.#links.owner,
      this.#tokenGetParam
    );
    const owner = new User(ownerData);
    return owner;
  }

  async getChildCampaigns() {
    const childCampaigns = await Promise.all(
      this.#links.childCampaigns.map(async (campUrl) => {
        const childCampaignData: any = await this.#apiCaller.get(
          campUrl,
          this.#tokenGetParam
        );
        const childCampaign = new Campaign(
          childCampaignData,
          this.#apiCaller,
          this.#tokenGetParam
        );
        return childCampaign;
      })
    );
    return childCampaigns;
  }

  async getParentCampaign() {
    if (this.#links.parentCampaign === null) return null;
    const parentCampaignData = await (this.#apiCaller.get(
      this.#links.parentCampaign,
      this.#tokenGetParam
    ) as Promise<CampaignData>);
    const parentCampaign = new Campaign(
      parentCampaignData,
      this.#apiCaller,
      this.#tokenGetParam
    );
    return parentCampaign;
  }
}
