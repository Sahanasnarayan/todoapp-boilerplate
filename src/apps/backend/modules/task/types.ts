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

// export type GetTaskByNameParams = {
//   accountId: string;
//   name: string;
// };

export type CreateTaskParams = {
  accountId: string;
  title: string;
  description: string;
  isComplete: boolean;
};

export type UpdateTaskParams = {
  accountId: string;
  taskId: string;
  title:string;
  description: string;
  isComplete: boolean;
}

export type DeleteTaskParams = {
  accountId: string;
  taskId: string;
};

// export type PaginationParams = {
//   page: number;
//   size: number;
// };

export enum TaskErrorCode {
  NOT_FOUND = 'TASK_ERR_01',
  TASK_ALREADY_EXISTS = 'TASK_ERR_02',
  // the error belong to name error
  // UNAUTHORIZED_TASK_ACCESS = 'TASK_ERR_03',
}

// export class TaskWithNameExistsError extends AppError {
//   code: TaskErrorCode;

//   constructor(name: string) {
//     super(`Task with name ${name} already exists.`);
//     this.code = TaskErrorCode.TASK_ALREADY_EXISTS;
//     this.httpStatusCode = 409;
//   }
// }

export class TaskNotFoundError extends AppError {
  code: TaskErrorCode;

  constructor(taskId: string) {
    super(`Task with taskId ${taskId} not found.`);
    this.code = TaskErrorCode.NOT_FOUND;
    this.httpStatusCode = 404;
  }
}

// export class TaskWithNameNotFoundError extends AppError {
//   code: TaskErrorCode;

//   constructor(taskName: string) {
//     super(`Task with name ${taskName} not found.`);
//     this.code = TaskErrorCode.NOT_FOUND;
//     this.httpStatusCode = 404;
//   }
// }
