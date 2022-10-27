import { APICaller } from "../api-caller";
import { UploadedFile } from "../../objects/uploaded-file";

interface TaskUpdatePayload {
  labels: {
    group: string;
    values: string[];
  }[];
}

interface TaskCustomFieldUpdatePayload {
  values: string[];
}

interface TaskSubstepUpdatePayload {
  isCompleted?: true;
  isInProgress?: true;
  assigneeId?: string;
}

interface TaskSubStepExternalWorkUpdatePayload {
  identifier?: string;
  title?: string;
  status?: string;
  url?: string;
}

interface TaskSubStepCommentUpdatePayload {
  value: string;
}

export class Task {
  #apiCaller: APICaller;

  constructor(apiCaller: APICaller) {
    this.#apiCaller = apiCaller;
  }

  async getTask(taskId: string, tokenGetParam?: any) {
    // TODO
  }

  async updateTask(
    taskId: string,
    update: TaskUpdatePayload,
    tokenGetParam?: any
  ) {
    // TODO
  }

  async getTaskBrief(taskId: string, tokenGetParam?: any) {
    // TODO
  }

  async getTaskCustomFields(
    taskId: string,
    option: PaginationOption = {},
    tokenGetParam?: any
  ) {
    // TODO
  }

  async getTaskCustomField(
    taskId: string,
    customFieldId: string,
    tokenGetParam?: any
  ) {
    // TODO
  }

  async updateTaskCustomField(
    taskId: string,
    customFieldId: string,
    update: TaskCustomFieldUpdatePayload,
    tokenGetParam?: any
  ) {
    // TODO
  }

  async getTaskCustomFieldChoices(
    taskId: string,
    customFieldId: string,
    tokenGetParam?: any
  ) {
    // TODO
  }

  async getTaskSubstep(
    taskId: string,
    stepId: string,
    subStepId: string,
    tokenGetParam?: any
  ) {
    // TODO
  }

  async updateTaskSubstep(
    taskId: string,
    stepId: string,
    subStepId: string,
    update: TaskSubstepUpdatePayload,
    tokenGetParam?: any
  ) {
    // TODO
  }

  async getTaskSubstepExternalWork(
    taskId: string,
    stepId: string,
    subStepId: string,
    tokenGetParam?: any
  ) {
    // TODO
  }

  async updateTaskSubStepExternalWork(
    taskId: string,
    stepId: string,
    subStepId: string,
    update: TaskSubStepExternalWorkUpdatePayload,
    tokenGetParam?: any
  ) {
    // TODO
  }

  async getTaskSubstepComments(
    taskId: string,
    stepId: string,
    subStepId: string,
    tokenGetParam?: any
  ) {
    // TODO
  }

  async addTaskSubstepComment(
    taskId: string,
    stepId: string,
    subStepId: string,
    comment: CommentCreatePayload,
    tokenGetParam?: any
  ) {
    // TODO
  }

  async getTaskSubstepComment(
    taskId: string,
    stepId: string,
    subStepId: string,
    commentId: string,
    tokenGetParam?: any
  ) {
    // TODO
  }

  async updateTaskSubstepComment(
    taskId: string,
    stepId: string,
    subStepId: string,
    commentId: string,
    update: TaskSubStepCommentUpdatePayload,
    tokenGetParam?: any
  ) {
    // TODO
  }

  async deleteTaskSubstepComment(
    taskId: string,
    stepId: string,
    subStepId: string,
    commentId: string,
    tokenGetParam?: any
  ) {
    // TODO
  }

  async getTaskAssets(
    taskId: string,
    option: PaginationOption = {},
    tokenGetParam?: any
  ) {
    // TODO
  }

  async addTaskAsset(taskId: string, asset: UploadedFile, tokenGetParam?: any) {
    // TODO
  }

  async addTaskAssetDraft(
    taskId: string,
    assetId: string,
    draft: UploadedFile,
    tokenGetParam?: any
  ) {
    // TODO
  }

  async getTaskAssetComments(
    taskId: string,
    assetId: string,
    tokenGetParam?: any
  ) {
    // TODO
  }

  async addTaskAssetComment(
    taskId: string,
    assetId: string,
    comment: CommentCreatePayload,
    tokenGetParam?: any
  ) {
    // TODO
  }

  async getTaskAttachments(
    taskId: string,
    option: PaginationOption = {},
    tokenGetParam?: any
  ) {
    // TODO
  }

  async getTaskArticle(taskId: string, articleId: string, tokenGetParam?: any) {
    // TODO
  }

  async getTaskImage(taskId: string, imageId: string, tokenGetParam?: any) {
    // TODO
  }

  async getTaskVideo(taskId: string, videoId: string, tokenGetParam?: any) {
    // TODO
  }

  async getTaskRawFile(taskId: string, rawFileId: string, tokenGetParam?: any) {
    // TODO
  }
}
