import { BriefBase, BriefBaseData } from "./brief";

export interface TaskBriefData extends BriefBaseData {
  links: {
    self: string;
    task: string;
  };
}

export class TaskBrief extends BriefBase {
  #links: TaskBriefData["links"];

  constructor(data: TaskBriefData) {
    const { links, ...baseData } = data;
    super(baseData);
    this.#links = data.links;
  }

  getRelatedLinks() {
    return this.#links;
  }
}
