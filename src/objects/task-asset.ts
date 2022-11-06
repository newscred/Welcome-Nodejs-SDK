import { APICaller } from "../modules/api-caller";
import { AssetBase, AssetBaseData } from "./base-asset";
import { UploadedFile } from "./uploaded-file";

export interface TaskAssetData extends AssetBaseData {
  type: "article" | "image" | "video" | "raw_file" | "structured_content";
  links: {
    self: string;
    task: string;
    drafts: string | null;
    webUrls: {
      self: string;
      task: string;
      drafts: string | null;
    };
  };
}

export class TaskAsset extends AssetBase {
  #apiCaller: APICaller;
  #tokenGetParam: any;
  #type: "article" | "image" | "video" | "raw_file" | "structured_content";
  #links: TaskAssetData["links"];

  constructor(data: TaskAssetData, apiCaller: APICaller, tokenGetParam?: any) {
    super(data);
    this.#apiCaller = apiCaller;
    this.#tokenGetParam = tokenGetParam;
    this.#type = data.type;
    this.#links = data.links;
  }
  get type() {
    return this.#type;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      type: this.#type,
      links: this.#links,
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
