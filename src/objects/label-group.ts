import { APICaller } from "../modules/api-caller";

interface LabelGroupData {
  id: string;
  name: string;
  sourceOrgType: string;
  values: Array<{
    id: string;
    name: string;
  }>;
}

export interface LabelGroup extends LabelGroupData {}
export class LabelGroup {
  constructor(data: LabelGroupData) {
    Object.assign(this, data);
  }
}
