import {UploadedFile} from "./objects/uploaded-file"

declare global {
  interface PaginationOption {
    offset?: number;
    pageSize?: number;
  }

  interface PaginatedResponse {
    pagination: {
      next: string | null;
      previous: string | null;
    };
  }

  interface CommentCreatePayload {
    value: string;
    attachments?: UploadedFile[]
  }
}

export {}