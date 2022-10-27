import {UploadedFile} from "./objects/uploaded-file"

declare global {
  interface PaginationOption {
    offset?: number;
    pageSize?: number;
  }

  interface CommentCreatePayload {
    value: string;
    attachments?: UploadedFile[]
  }
}

export {}