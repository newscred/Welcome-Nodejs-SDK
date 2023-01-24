import { APICaller } from "../modules/api-caller";
import { Attachment, AttachmentData } from "./attachment";
import { ListData } from "./base-list-data";
import { PaginatedResponse } from "./common/types";

export interface AttachmentListData extends PaginatedResponse {
  data: Array<AttachmentData>;
}

export class AttachmentList extends ListData {
  data: Array<Attachment>;
  constructor(
    data: AttachmentListData,
    apiCaller: APICaller,
    tokenGetParam?: any
  ) {
    super(data, apiCaller, tokenGetParam);
    this.data = data.data.map((attachment) => new Attachment(attachment));
  }
}
