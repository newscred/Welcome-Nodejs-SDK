import { APICaller } from "../modules/api-caller";
import { ExternalWork, ExternalWorkData } from "./external-work";
// Warning! CIRCULAR DEPENDECY
import { Task, TaskData } from "./task";
import { User, UserData } from "./user";

export interface TaskSubStepData {
  id: string;
  title: string;
  assigneeId: string | null;
  isCompleted: boolean;
  isInProgress: boolean;
  isSkipped: boolean;
  isExternal: boolean;
  links: {
    self: string;
    task: string;
    externalWork: string | null;
    assignee?: string | null;
  };
}

export class TaskSubStep {
  #apiCaller: APICaller;
  #tokenGetParam: any;
  #id!: string;
  #title!: string;
  #assigneeId!: string | null;
  #isCompleted!: boolean;
  #isInProgress!: boolean;
  #isSkipped!: boolean;
  #isExternal!: boolean;
  #links!: {
    self: string;
    task: string;
    externalWork: string | null;
    assignee?: string | null;
  };

  constructor(
    apiCaller: APICaller,
    data: TaskSubStepData,
    tokenGetParam?: any
  ) {
    this.#apiCaller = apiCaller;
    this.#tokenGetParam = tokenGetParam;
    this.#loadData(data);
  }

  #loadData(data: TaskSubStepData) {
    this.#id = data.id;
    this.#title = data.title;
    this.#assigneeId = data.assigneeId;
    this.#isCompleted = data.isCompleted;
    this.#isInProgress = data.isInProgress;
    this.#isSkipped = data.isSkipped;
    this.#isExternal = data.isExternal;
    this.#links = data.links;
  }

  get id() {
    return this.#id;
  }
  get title() {
    return this.#title;
  }
  get assigneeId() {
    return this.#assigneeId;
  }
  get isCompleted() {
    return this.#isCompleted;
  }
  get isInProgress() {
    return this.#isInProgress;
  }
  get isSkipped() {
    return this.#isSkipped;
  }
  get isExternal() {
    return this.#isExternal;
  }

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      assigneeId: this.#assigneeId,
      isCompleted: this.#isCompleted,
      isInProgress: this.#isInProgress,
      isSkipped: this.#isSkipped,
      isExternal: this.#isExternal,
      links: this.#links,
    };
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

  async getTask() {
    const response = await this.#apiCaller.get(
      this.#links.task,
      this.#tokenGetParam
    );
    return new Task(this.#apiCaller, response as TaskData, this.#tokenGetParam);
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
    if (!this.#assigneeId) {
      return;
    }
    const response = await this.#apiCaller.get(
      this.#links.assignee!,
      this.#tokenGetParam
    );
    return new User(response as UserData);
  }
}
