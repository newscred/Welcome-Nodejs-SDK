import { APICaller } from "../modules/api-caller";
import { TaskSubStep, TaskSubStepData } from "./task-substep";

interface Common {
  id: string;
  title: string;
  isCompleted: boolean;
  description: string | null;
}

export interface TaskStepData extends Common {
  dueAt: string | null;
  subSteps: TaskSubStepData[];
}

export interface TaskStep extends Common {
  dueAt: Date | null;
  subSteps: TaskSubStep[];
}
export class TaskStep {
  #apiCaller: APICaller;
  #tokenGetParam: any;

  constructor(apiCaller: APICaller, data: TaskStepData, tokenGetParam?: any) {
    this.#apiCaller = apiCaller;
    this.#tokenGetParam = tokenGetParam;
    this.#loadData(data);
  }

  #loadData(data: TaskStepData) {
    const { dueAt, subSteps, ...other } = data;
    this.dueAt = data.dueAt ? new Date(data.dueAt) : null;
    this.subSteps = subSteps.map(
      (substep) =>
        new TaskSubStep(substep, this.#apiCaller, this.#tokenGetParam)
    );
    Object.assign(this, other);
  }

  toJSON() {
    return {
      ...this,
      dueAt: this.dueAt ? this.dueAt.toISOString() : null,
    };
  }
}
