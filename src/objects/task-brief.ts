import { APICaller } from "../modules/api-caller";
import { BriefBase, BriefBaseData } from "./brief";
import { Task, TaskData } from "./task";

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
