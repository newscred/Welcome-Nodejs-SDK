import { APICaller } from "../api-caller";
import { LabelGroupList } from "../../objects/label-group-list";
import { convertObjectKeysToSnakeCase } from "../../util";

export class Label {
  #apiCaller: APICaller;

  constructor(apiCaller: APICaller) {
    this.#apiCaller = apiCaller;
  }

  async getLabelGroups(
    filter?: {
      sourceOrgType?: "current" | "related";
      offset?: number;
      pageSize?: number;
    },
    tokenGetParam?: any
  ) {
    let query = "";
    if (filter) {
      const filterSnakeCased = convertObjectKeysToSnakeCase(filter);
      Object.keys(filterSnakeCased).forEach((k) => {
        if (!query) query += "?";
        else query += "&";
        query += `${k}=${filterSnakeCased[k]}`;
      });
    }

    const labelGroupData: any = await this.#apiCaller.get(
      "/label-groups" + query,
      tokenGetParam
    );

    const labelGroupList = new LabelGroupList(
      labelGroupData,
      this.#apiCaller,
      tokenGetParam
    );
    return labelGroupList;
  }
}
