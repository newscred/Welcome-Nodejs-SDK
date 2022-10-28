import { APICaller } from "../modules/api-caller";
import { TaskStep } from "./task-step";

export interface TaskData {
  id: string;
  title: string;
  startAt: string | null;
  dueAt: string | null;
  isCompleted: boolean;
  isArchived: boolean;
  referenceId: string;
  labels: {
    group: {
      id: string;
      name: string;
    };
    values: {
      id: string;
      name: string;
    }[];
  }[];
  steps: TaskStep[];
  links: {
    self: string;
    assets: string;
    attachments: string;
    brief: string | null;
    campaign: string;
    customFields: string | null;
    webUrls: {
      self: string;
      brief: string;
    };
  };
}

export interface Task extends TaskData {}
export class Task {
  #apiCaller: APICaller;
  #tokenGetParam: any;

  constructor(apiCaller: APICaller, data: TaskData, tokenGetParam?: any) {
    this.#apiCaller = apiCaller;
    this.#tokenGetParam = tokenGetParam;
    Object.assign(this, data);
    this.steps = data.steps.map(
      (step) => new TaskStep(apiCaller, step, tokenGetParam)
    );
  }

  async update() {}

  async getBrief() {}

  async getCustomFields() {}

  async getAssets() {}

  async addAsset() {}

  async getAttachments() {}
}
