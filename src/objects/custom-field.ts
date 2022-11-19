import { APICaller } from "../modules/api-caller";
import { buildQueryString } from "../util";

export interface CustomFieldData {
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
  links: {
    self: string;
    choices: string | null;
  };
}

export class CustomField {
  #apiCaller: APICaller;
  #tokenGetParam: any;

  #id!: CustomFieldData["id"];
  #name!: CustomFieldData["name"];
  #type!: CustomFieldData["type"];
  #values!: CustomFieldData["values"];
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
    this.#id = data.id;
    this.#name = data.name;
    this.#type = data.type;
    this.#values = data.values;
    this.#links = data.links;
  }

  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get type() {
    return this.#type;
  }
  get values() {
    return this.#values;
  }

  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      type: this.#type,
      values: this.#values,
      links: this.#links,
    };
  }

  async getChoices(
    option: PaginationOption = {}
  ) {
    if (!this.#links.choices) {
      return null;
    }
    let url = this.#links.choices;
    let query = buildQueryString(option);
    const response = await this.#apiCaller.get(url + query, this.#tokenGetParam);
    // TODO: return list class object instance
    return response;
  }
}
