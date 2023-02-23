import { APICaller } from "../modules/api-caller";
import { ExternalWork, ExternalWorkData } from "./external-work";
import { User, UserData } from "./user";

interface Common {
  id: string;
  title: string;
  assigneeId: string | null;
  isCompleted: boolean;
  isInProgress: boolean;
  isSkipped: boolean;
  isExternal: boolean;
}

export interface TaskSubStepData extends Common {
  links: {
    self: string;
    task: string;
    externalWork: string | null;
    assignee?: string | null;
  };
}

export interface TaskSubStep extends Common {}
export class TaskSubStep {
  #apiCaller: APICaller;
  #tokenGetParam: any;
  #links!: TaskSubStepData["links"];

  constructor(
    data: TaskSubStepData,
    apiCaller: APICaller,
    tokenGetParam?: any
  ) {
    this.#apiCaller = apiCaller;
    this.#tokenGetParam = tokenGetParam;
    this.#loadData(data);
  }

  #loadData(data: TaskSubStepData) {
    const { links, ...other } = data;
    this.#links = links;
    Object.assign(this, other);
  }

  getRelatedLinks() {
    return this.#links;
  }

  async update(payload: {
    assigneeId?: string | null;
    isCompleted?: true;
    isInProgress?: true;
  }) {
    const response = await this.#apiCaller.patch(
      this.#links.self,
      payload,
      this.#tokenGetParam
    );
    this.#loadData(response as TaskSubStepData);
  }

  async getExternalWork() {
    if (!this.#links.externalWork) return null;
    const response = await this.#apiCaller.get(
      this.#links.externalWork,
      this.#tokenGetParam
    );
    return new ExternalWork(
      response as ExternalWorkData,
      this.#apiCaller,
      this.#tokenGetParam
    );
  }

  async getAssignee() {
    if (!this.assigneeId) {
      return;
    }
    const response = await this.#apiCaller.get(
      this.#links.assignee!,
      this.#tokenGetParam
    );
    return new User(response as UserData);
  }
}
