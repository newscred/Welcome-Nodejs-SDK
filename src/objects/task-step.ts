import { APICaller } from "../modules/api-caller";
import { TaskSubStep } from "./task-substep";

interface TaskStepData {
  id: string;
  title: string;
  isCompleted: boolean;
  description: string | null;
  dueAt: string;
  subSteps: TaskSubStep[];
}

export interface TaskStep extends TaskStepData {}
export class TaskStep {
  #apiCaller: APICaller;
  #tokenGetParam: any;

  constructor(apiCaller: APICaller, data: TaskStepData, tokenGetParam?: any) {
    this.#apiCaller = apiCaller;
    this.#tokenGetParam = tokenGetParam;
    Object.assign(this, data);
    this.subSteps = data.subSteps.map(
      (substep) => new TaskSubStep(apiCaller, substep, tokenGetParam)
    );
  }
}
