import { APICaller } from "../../modules/api-caller";
import { FolderData, IFolder, IFolderList } from "./types";

type Ctor<T> = {
  new (data: any, apiCaller: APICaller, tokenGetParam: any): T;
};

export class Folder implements IFolder {
  #apiCaller: APICaller;
  #tokenGetParam: any;
  #links: FolderData["links"];
  createdAt!: Date;
  modifiedAt!: Date;
  id!: string;
  name!: string;
  parentFolderId!: string | null;
  path!: string;
  getChildFolders!: () => Promise<IFolderList>;

  constructor(data: FolderData, apiCaller: APICaller, tokenGetParam?: any) {
    const { links, createdAt, modifiedAt, ...other } = data;
    this.#links = links;
    this.#apiCaller = apiCaller;
    this.#tokenGetParam = tokenGetParam;
    this.createdAt = new Date(createdAt);
    this.modifiedAt = new Date(modifiedAt);
    Object.assign(this, other);
  }

  toJSON() {
    return {
      ...this,
      createdAt: this.createdAt.toISOString(),
      modifiedAt: this.modifiedAt.toISOString(),
    }
  }

  getRelatedLinks() {
    return this.#links;
  }

  async getParentFolder() {
    if (!this.#links.parentFolder) return null;
    const response = await this.#apiCaller.get(
      this.#links.parentFolder,
      this.#tokenGetParam
    );
    return new Folder(
      response as FolderData,
      this.#apiCaller,
      this.#tokenGetParam
    );
  }

  async _getChildFolders<T>(folderListObjectConstructor: Ctor<T>) {
    const response = await this.#apiCaller.get(this.#links.childFolders, this.#tokenGetParam);
    return new folderListObjectConstructor(
      response,
      this.#apiCaller,
      this.#tokenGetParam
    );
  }
}
