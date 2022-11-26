import { APICaller } from "../modules/api-caller";
import { TaskAssetBase, TaskAssetBaseData } from "./base-task-asset";
import { UploadedFile } from "./uploaded-file";

export interface TaskAssetData extends TaskAssetBaseData {
  type: "article" | "image" | "video" | "raw_file" | "structured_content";
  content: {
    type: "url" | "api_url" | "html_body";
    value: string;
  };
}

export class TaskAsset extends TaskAssetBase {
  #apiCaller: APICaller;
  #tokenGetParam: any;
  #links: TaskAssetBaseData["links"];
  type: TaskAssetData["type"];
  content: TaskAssetData["content"];

  constructor(data: TaskAssetData, apiCaller: APICaller, tokenGetParam?: any) {
    super(data);
    this.#apiCaller = apiCaller;
    this.#tokenGetParam = tokenGetParam;
    this.#links = data.links;
    this.type = data.type;
    this.content = data.content;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      ...this,
    };
  }

  getRelatedLinks() {
    return this.#links;
  }

  async addDraft(uploadedFile: UploadedFile) {
    if (!this.#links.drafts) {
      throw new Error("Cannot post draft for this task asset");
    }
    const response = await this.#apiCaller.post(
      this.#links.drafts,
      { key: uploadedFile.key, title: uploadedFile.title },
      this.#tokenGetParam
    );
    return response;
  }

  async getComments() {
    const response = await this.#apiCaller.get(
      this.#links.task + "/assets/" + this.id + "/comments",
      this.#tokenGetParam
    );
    return response;
  }

  async addComment(comment: CommentCreatePayload) {
    const response = await this.#apiCaller.post(
      this.#links.task + "/assets/" + this.id + "/comments",
      comment,
      this.#tokenGetParam
    );
    return response;
  }
}
