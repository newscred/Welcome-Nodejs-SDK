import { APICaller } from "../modules/api-caller";
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
  #modifiedField!:
    | "assigneeId"
    | "isCompleted"
    | "isInProgress"
    | "isSkipped"
    | null;
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
    this.#modifiedField = null;
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
  get links() {
    return this.#links;
  }

  set assigneeId(value) {
    this.#assigneeId = value;
    this.#modifiedField = "assigneeId";
  }

  set isCompleted(value) {
    if (value !== true) {
      throw new Error("'isCompleted' can only be set to true");
    }
    this.#isCompleted = true;
    this.#isInProgress = false;
    this.#isSkipped = false;
    this.#modifiedField = "isCompleted";
  }

  set isInProgress(value) {
    if (value !== true) {
      throw new Error("'isInProgress' can only be set to true");
    }
    this.#isCompleted = false;
    this.#isInProgress = true;
    this.#isSkipped = false;
    this.#modifiedField = "isInProgress";
  }

  set isSkipped(value) {
    if (value !== true) {
      throw new Error("'isSkipped' can only be set to true");
    }
    this.#isCompleted = false;
    this.#isInProgress = false;
    this.#isSkipped = true;
    this.#modifiedField = "isSkipped";
  }

  isModified() {
    return Boolean(this.#modifiedField);
  }

  getModifiedField() {
    return this.#modifiedField;
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

  async update() {
    if (!this.isModified()) {
      return;
    }
    const updatePayload = {
      [this.getModifiedField()!]: this[this.getModifiedField()!],
    };
    const response = await this.#apiCaller.patch(
      this.links.self,
      updatePayload,
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
    // TODO
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
