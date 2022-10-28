import { APICaller } from "../modules/api-caller";
import { ListData } from "./base-list-data";
import { CustomField, CustomFieldData } from "./custom-field";

export interface CustomFieldListData extends PaginatedResponse {
  data: Array<CustomFieldData>;
}

export class CustomFieldList extends ListData {
  data: Array<CustomField>;
  constructor(
    apiCaller: APICaller,
    data: CustomFieldListData,
    tokenGetParam?: any
  ) {
    super(data, apiCaller, tokenGetParam);
    this.data = data.data.map(
      (labelGroup) => new CustomField(apiCaller, labelGroup, tokenGetParam)
    );
  }
}
