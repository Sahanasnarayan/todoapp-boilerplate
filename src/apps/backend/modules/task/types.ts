// eslint-disable-next-line max-classes-per-file
import AppError from '../error/app-error';

export class Task {
  id: string;
  account: string;
  title: string;
  description: string;
  isComplete: boolean;
}
export type GetAllTaskParams = {
  accountId: string;
};

export type GetTaskParams = {
  accountId: string;
  taskId: string;
};

export type CreateTaskParams = {
  accountId: string;
  title: string;
  description: string;
  isComplete: boolean;
};

export type UpdateTaskParams = {
  accountId: string;
  taskId: string;
  title: string;
  description: string;
  isComplete: boolean;
}

export type DeleteTaskParams = {
  accountId: string;
  taskId: string;
};
export enum TaskErrorCode {
  NOT_FOUND = 'TASK_ERR_01',
  TASK_ALREADY_EXISTS = 'TASK_ERR_02',
}

export class TaskNotFoundError extends AppError {
  code: TaskErrorCode;

  constructor(taskId: string) {
    super(`Task with taskId ${taskId} not found.`);
    this.code = TaskErrorCode.NOT_FOUND;
    this.httpStatusCode = 404;
  }
}
