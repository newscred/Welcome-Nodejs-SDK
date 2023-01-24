import { APICaller } from "../modules/api-caller";
import { ListData } from "./base-list-data";
import { LabelGroup } from "./label-group";
import { PaginatedResponse } from "./common/types";

export interface LabelGroupListData extends PaginatedResponse {
  data: Array<LabelGroup>;
}

export class LabelGroupList extends ListData {
  data: Array<LabelGroup>;
  constructor(
    data: LabelGroupListData,
    apiCaller: APICaller,
    tokenGetParam?: any
  ) {
    super(data, apiCaller, tokenGetParam);
    this.data = data.data.map((labelGroup) => new LabelGroup(labelGroup));
  }
}
