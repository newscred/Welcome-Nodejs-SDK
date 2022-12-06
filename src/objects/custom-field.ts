import { APICaller } from "../modules/api-caller";
import { buildQueryString } from "../util";
import { PaginationOption } from "./common/types";

interface Common {
  id: string;
  name: string;
  type:
    | "text_field"
    | "multi_line_text_field"
    | "checkboxes"
    | "dropdown"
    | "multi_select_dropdown"
    | "multiple_choice"
    | "date_field"
    | "image"
    | "video"
    | "rich_text_field";
  values: {
    id: string;
    name: string;
  }[];
}

export interface CustomFieldData extends Common {
  links: {
    self: string;
    choices: string | null;
  };
}

export interface CustomField extends Common {}
export class CustomField {
  #apiCaller: APICaller;
  #tokenGetParam: any;
  #links!: CustomFieldData["links"];

  constructor(
    data: CustomFieldData,
    apiCaller: APICaller,
    tokenGetParam?: any
  ) {
    this.#apiCaller = apiCaller;
    this.#tokenGetParam = tokenGetParam;
    this.#loadData(data);
  }

  #loadData(data: CustomFieldData) {
    const { links, ...other } = data;
    this.#links = links;
    Object.assign(this, other);
  }

  getRelatedLinks() {
    return this.#links;
  }

  async getChoices(option: PaginationOption = {}) {
    if (!this.#links.choices) {
      return null;
    }
    let url = this.#links.choices;
    let query = buildQueryString(option);
    const response = await this.#apiCaller.get(
      url + query,
      this.#tokenGetParam
    );
    // TODO: List object
    return response;
  }
}
