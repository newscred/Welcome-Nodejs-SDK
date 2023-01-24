export interface AttachmentData {
  id: string;
  name: string;
  url: string;
}

export interface Attachment extends AttachmentData {}
export class Attachment {
  constructor(data: AttachmentData) {
    Object.assign(this, data);
  }
}
