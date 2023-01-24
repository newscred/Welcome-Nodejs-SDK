export interface BriefBaseData {
  type: string;
  title: string;
  template: {
    id: string;
    name: string;
  } | null;
  fields: Array<{ name: string; value: string }>;
}

export interface BriefBase extends BriefBaseData {}
export class BriefBase {
  constructor(data: BriefBaseData) {
    Object.assign(this, data);
  }
}
