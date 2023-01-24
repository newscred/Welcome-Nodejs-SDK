import { UploadedFile } from "./objects/uploaded-file";

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
    attachments?: UploadedFile[];
  }

  interface LabelPayload {
    group: string;
    values: string[];
  }

  interface LabelResponse {
    group: {
      id: string;
      name: string;
    };
    values: {
      id: string;
      name: string;
    }[];
  }
}

export {};
