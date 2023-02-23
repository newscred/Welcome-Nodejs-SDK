import { APICaller } from "../modules/api-caller";
import { buildQueryString } from "../util";
import { TaskStep, TaskStepData } from "./task-step";
import { TaskBrief, TaskBriefData } from "./task-brief";
import { CustomFieldList, CustomFieldListData } from "./custom-field-list";
import { TaskAsset, TaskAssetData } from "./task-generic-asset";
import { TaskAssetList, TaskAssetListData } from "./task-asset-list";
import { UploadedFile } from "./uploaded-file";
import { AttachmentList, AttachmentListData } from "./attachment-list";
import { Campaign, CampaignData } from "./campaign";
import { LabelResponse, LabelPayload, PaginationOption } from "./common/types";

interface Common {
  id: string;
  title: string;
  isCompleted: boolean;
  isArchived: boolean;
  referenceId: string;
  labels: LabelResponse[];
}

export interface TaskData {
  startAt: string | null;
  dueAt: string | null;
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

export interface Task extends Common {
  startAt: Date | null;
  dueAt: Date | null;
  steps: TaskStep[];
}
export class Task {
  #apiCaller: APICaller;
  #tokenGetParam: any;
  #links!: TaskData["links"];

  constructor(data: TaskData, apiCaller: APICaller, tokenGetParam?: any) {
    this.#apiCaller = apiCaller;
    this.#tokenGetParam = tokenGetParam;
    this.#loadData(data);
  }

  #loadData(data: TaskData) {
    const { startAt, dueAt, links, steps, ...other } = data;
    this.startAt = startAt ? new Date(startAt) : null;
    this.dueAt = dueAt ? new Date(dueAt) : null;
    this.#links = data.links;
    this.steps = steps.map(
      (step) => new TaskStep(this.#apiCaller, step, this.#tokenGetParam)
    );
    Object.assign(this, other);
  }

  getRelatedLinks() {
    return this.#links;
  }

  toJSON() {
    return {
      ...this,
      startAt: this.startAt ? this.startAt.toISOString() : null,
      dueAt: this.dueAt ? this.dueAt.toISOString() : null,
      steps: this.steps.map((step) => step.toJSON()),
    };
  }

  async update(payload: { labels: LabelPayload[] }) {
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
    const response = (await this.#apiCaller.get(
      this.#links.brief,
      this.#tokenGetParam
    )) as TaskBriefData;
    return new TaskBrief(response);
  }

  async getCampaign() {
    const response = await this.#apiCaller.get(
      this.#links.campaign,
      this.#tokenGetParam
    );
    return new Campaign(
      response as CampaignData,
      this.#apiCaller,
      this.#tokenGetParam
    );
  }

  async getCustomFields(option: PaginationOption = {}) {
    if (!this.#links.customFields) {
      return null;
    }
    const url = this.#links.customFields;
    const query = buildQueryString(option);
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

  async getAssets(option: PaginationOption = {}) {
    const query = buildQueryString(option);
    const response = await this.#apiCaller.get(
      this.#links.assets + query,
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

  async getAttachments(option: PaginationOption = {}) {
    const query = buildQueryString(option);
    const response = await this.#apiCaller.get(
      this.#links.attachments + query,
      this.#tokenGetParam
    );
    return new AttachmentList(
      response as AttachmentListData,
      this.#apiCaller,
      this.#tokenGetParam
    );
  }
}
