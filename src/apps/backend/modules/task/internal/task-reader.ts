import {
  GetAllTaskParams,
  GetTaskParams,
  Task,
  TaskNotFoundError,
} from '../types';

import TaskRepository from './store/task-repository';
import TaskUtil from './task-util';

export default class TaskReader {
  public static async getTaskForAccount(params: GetTaskParams): Promise<Task> {
    const task = await TaskRepository.taskDB.findOne({
      _id: params.taskId,
      account: params.accountId,
    });
    if (!task) {
      throw new TaskNotFoundError(params.taskId);
    }
    return TaskUtil.convertTaskDBToTask(task);
  }

  public static async getTasksForAccount(params: GetAllTaskParams): Promise<Task[]> {
    const tasks = await TaskRepository.taskDB
      .find({ account: params.accountId, })
    return tasks.map((task) => TaskUtil.convertTaskDBToTask(task));
  }
}
