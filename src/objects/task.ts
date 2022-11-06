import { APICaller } from "../modules/api-caller";
import { buildQueryString } from "../util";
import { TaskStep, TaskStepData } from "./task-step";
import { TaskBrief, TaskBriefData } from "./brief";
import { CustomFieldList, CustomFieldListData } from "./custom-field-list";
import { TaskAsset, TaskAssetData } from "./task-asset";
import { TaskAssetList, TaskAssetListData } from "./task-asset-list";
import { UploadedFile } from "./uploaded-file";
import { AttachmentList, AttachmentListData } from "./attachment-list";

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

  constructor(data: TaskData, apiCaller: APICaller, tokenGetParam?: any) {
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

  async update(payload: {
    labels: {
      group: string;
      values: string[];
    }[];
  }) {
    const response = await this.#apiCaller.patch(
      this.#links.self,
      payload,
      this.#tokenGetParam
    );
    this.#loadData(response as TaskData);
  }

  async getBrief() {
    if (!this.#links.brief) {
      return null;
    }
    const response = await this.#apiCaller.get(
      this.#links.brief,
      this.#tokenGetParam
    );
    return new TaskBrief(
      response as TaskBriefData,
      this.#apiCaller,
      this.#tokenGetParam
    );
  }

  async getCustomFields(option: PaginationOption) {
    if (!this.#links.customFields) {
      return null;
    }
    let url = this.#links.customFields;
    let query = buildQueryString(option);
    const response = await this.#apiCaller.get(
      url + query,
      this.#tokenGetParam
    );
    return new CustomFieldList(
      response as CustomFieldListData,
      this.#apiCaller,
      this.#tokenGetParam
    );
  }

  async getAssets() {
    const response = await this.#apiCaller.get(
      this.#links.assets,
      this.#tokenGetParam
    );
    return new TaskAssetList(
      response as TaskAssetListData,
      this.#apiCaller,
      this.#tokenGetParam
    );
  }

  async addAsset(uploadedFile: UploadedFile) {
    const response = await this.#apiCaller.post(
      this.#links.assets,
      {
        key: uploadedFile.key,
        title: uploadedFile.title,
      },
      this.#tokenGetParam
    );

    return new TaskAsset(
      response as TaskAssetData,
      this.#apiCaller,
      this.#tokenGetParam
    );
  }

  async getAttachments() {
    const response = await this.#apiCaller.get(
      this.#links.attachments,
      this.#tokenGetParam
    );
    return new AttachmentList(
      response as AttachmentListData,
      this.#apiCaller,
      this.#tokenGetParam
    );
  }
}
