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

class BriefBase {
  #type: BriefBaseData["type"];
  #title: BriefBaseData["title"];
  #template: BriefBaseData["template"];
  #fields: BriefBaseData["fields"];

  constructor(data: BriefBaseData) {
    this.#type = data.type;
    this.#title = data.title;
    this.#template = data.template;
    this.#fields = data.fields;
  }

  get type() {
    return this.#type;
  }
  get title() {
    return this.#title;
  }
  get template() {
    return this.#template;
  }
  get fields() {
    return this.#fields;
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
    apiCaller: APICaller,
    data: CampaignBriefData,
    tokenGetParam?: any
  ) {
    super(data);
    this.#apiCaller = apiCaller;
    this.#tokenGetParam = tokenGetParam;
    this.#links = data.links;
  }

  async getCampaign() {
    const campaignData: any = await this.#apiCaller.get(
      this.#links.campaign,
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

  constructor(apiCaller: APICaller, data: TaskBriefData, tokenGetParam?: any) {
    super(data);
    this.#apiCaller = apiCaller;
    this.#tokenGetParam = tokenGetParam;
    this.#links = data.links;
  }

  async getTask() {
    const taskData = await this.#apiCaller.get(
      this.#links.task,
      this.#tokenGetParam
    );
    const task = new Task(
      this.#apiCaller,
      taskData as TaskData,
      this.#tokenGetParam
    );
    return task;
  }
}
