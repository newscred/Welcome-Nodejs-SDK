import { UploadedFile } from "../uploaded-file";

export interface PaginationOption {
  offset?: number;
  pageSize?: number;
}

export interface PaginatedResponse {
  pagination: {
    next: string | null;
    previous: string | null;
  };
}

export interface LabelPayload {
  group: string;
  values: string[];
}

export interface LabelResponse {
  group: {
    id: string;
    name: string;
  };
  values: {
    id: string;
    name: string;
  }[];
}

export interface CommentCreatePayload {
  value: string;
  attachments?: UploadedFile[];
}
