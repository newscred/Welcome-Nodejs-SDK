import { APICaller } from "../modules/api-caller";
import { ListData } from "./base-list-data";
import { CustomField, CustomFieldData } from "./custom-field";

export interface CustomFieldListData extends PaginatedResponse {
  data: Array<CustomFieldData>;
}

export class CustomFieldList extends ListData {
  data: Array<CustomField>;
  constructor(
    data: CustomFieldListData,
    apiCaller: APICaller,
    tokenGetParam?: any
  ) {
    super(data, apiCaller, tokenGetParam);
    this.data = data.data.map(
      (customField) => new CustomField(customField, apiCaller, tokenGetParam)
    );
  }
}
