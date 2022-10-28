import { APICaller } from "../modules/api-caller";
import { TaskSubStep, TaskSubStepData } from "./task-substep";

export interface TaskStepData {
  id: string;
  title: string;
  isCompleted: boolean;
  description: string | null;
  dueAt: string | null;
  subSteps: TaskSubStepData[];
}

export class TaskStep {
  #apiCaller: APICaller;
  #tokenGetParam: any;
  #id!: string;
  #title!: string;
  #isCompleted!: boolean;
  #description!: string | null;
  #dueAt!: Date | null;
  #subSteps!: TaskSubStep[];

  constructor(apiCaller: APICaller, data: TaskStepData, tokenGetParam?: any) {
    this.#apiCaller = apiCaller;
    this.#tokenGetParam = tokenGetParam;
    this.#loadData(data);
  }

  #loadData(data: TaskStepData) {
    this.#id = data.id;
    this.#title = data.title;
    this.#isCompleted = data.isCompleted;
    this.#description = data.description;
    this.#dueAt = data.dueAt ? new Date(data.dueAt) : null;
    this.#subSteps = data.subSteps.map(
      (substep) =>
        new TaskSubStep(this.#apiCaller, substep, this.#tokenGetParam)
    );
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get isCompleted() {
    return this.#isCompleted;
  }

  get description() {
    return this.#description;
  }

  get dueAt() {
    return this.#dueAt;
  }

  get subSteps() {
    return this.#subSteps;
  }

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      isCompleted: this.#isCompleted,
      description: this.#description,
      dueAt: this.#dueAt ? this.#dueAt.toISOString() : null,
      subSteps: this.#subSteps.map(subStep => subStep.toJSON())
    }
  }
}
