import { APICaller } from "../modules/api-caller";

// Warning! CIRCULAR DEPENDECY
import { Campaign } from "./campaign";
import { Task, TaskData } from "./task";

interface BriefBaseData {
  type: string;
  title: string;
  template: {
    id: string;
    name: string;
  } | null;
  fields: Array<{ name: string; value: string }>;
}

interface BriefBase extends BriefBaseData {}
class BriefBase {
  constructor(data: BriefBaseData) {
    Object.assign(this, data);
  }
}

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
    const campaignData: any = await this.#apiCaller.get(
      this.#links.campaign,
      this.#tokenGetParam
    );
    const campaign = new Campaign(
      campaignData,
      this.#apiCaller,
      this.#tokenGetParam
    );
    return campaign;
  }
}

export interface TaskBriefData extends BriefBaseData {
  links: {
    self: string;
    task: string;
  };
}

export class TaskBrief extends BriefBase {
  #apiCaller: APICaller;
  #tokenGetParam: any;
  #links: TaskBriefData["links"];

  constructor(data: TaskBriefData, apiCaller: APICaller, tokenGetParam?: any) {
    const { links, ...baseData } = data;
    super(baseData);
    this.#apiCaller = apiCaller;
    this.#tokenGetParam = tokenGetParam;
    this.#links = data.links;
  }

  getRelatedLinks() {
    return this.#links;
  }

  async getTask() {
    const taskData = await this.#apiCaller.get(
      this.#links.task,
      this.#tokenGetParam
    );
    const task = new Task(
      taskData as TaskData,
      this.#apiCaller,
      this.#tokenGetParam
    );
    return task;
  }
}
