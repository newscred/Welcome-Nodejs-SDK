import { APICaller } from "../modules/api-caller";
import { TaskStep, TaskStepData } from "./task-step";

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
  steps: TaskStepData[];
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

export class Task {
  #apiCaller: APICaller;
  #tokenGetParam: any;
  #id!: string;
  #title!: string;
  #startAt!: Date | null;
  #dueAt!: Date | null;
  #isCompleted!: boolean;
  #isArchived!: boolean;
  #referenceId!: string;
  #labels!: {
    group: {
      id: string;
      name: string;
    };
    values: {
      id: string;
      name: string;
    }[];
  }[];
  #steps!: TaskStep[];
  #links!: {
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

  constructor(apiCaller: APICaller, data: TaskData, tokenGetParam?: any) {
    this.#apiCaller = apiCaller;
    this.#tokenGetParam = tokenGetParam;
    this.#loadData(data);
  }

  #loadData(data: TaskData) {
    this.#id = data.id;
    this.#title = data.title;
    this.#startAt = data.startAt ? new Date(data.startAt) : null;
    this.#dueAt = data.dueAt ? new Date(data.dueAt) : null;
    this.#isCompleted = data.isCompleted;
    this.#isArchived = data.isArchived;
    this.#referenceId = data.referenceId;
    this.#labels = data.labels;
    this.#steps = data.steps.map(
      (step) => new TaskStep(this.#apiCaller, step, this.#tokenGetParam)
    );
    this.#links = data.links;
  }

  get id() {
    return this.#id;
  }
  get title() {
    return this.#title;
  }
  get startAt() {
    return this.#startAt;
  }
  get dueAt() {
    return this.#dueAt;
  }
  get isCompleted() {
    return this.#isCompleted;
  }
  get isArchived() {
    return this.#isArchived;
  }
  get referenceId() {
    return this.#referenceId;
  }
  get labels() {
    return this.#labels;
  }
  get steps() {
    return this.#steps;
  }

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      startAt: this.#startAt ? this.#startAt.toISOString() : null,
      dueAt: this.#dueAt ? this.#dueAt.toISOString() : null,
      isCompleted: this.#isCompleted,
      isArchived: this.#isArchived,
      referenceId: this.#referenceId,
      labels: this.#labels,
      steps: this.#steps.map((step) => step.toJSON()),
      links: this.#links,
    };
  }

  async update() {}

  async getBrief() {}

  async getCustomFields() {}

  async getAssets() {}

  async addAsset() {}

  async getAttachments() {}
}
