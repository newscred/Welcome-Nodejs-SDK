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
  #type: "article" | "image" | "video" | "raw_file" | "structured_content";
  #content: TaskAssetData["content"];
  #links: TaskAssetBaseData["links"];

  constructor(data: TaskAssetData, apiCaller: APICaller, tokenGetParam?: any) {
    super(data);
    this.#apiCaller = apiCaller;
    this.#tokenGetParam = tokenGetParam;
    this.#type = data.type;
    this.#content = data.content;
    this.#links = data.links;
  }
  get type() {
    return this.#type;
  }
  get content() {
    return this.#content;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      type: this.#type,
      content: this.#content,
    };
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
