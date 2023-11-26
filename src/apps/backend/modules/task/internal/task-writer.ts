import {
  CreateTaskParams,
  DeleteTaskParams,
  Task,
  UpdateTaskParams,
  TaskNotFoundError
} from '../types';

import TaskRepository from './store/task-repository';

import TaskUtil from './task-util';

export default class TaskWriter {
  public static async createTask(params: CreateTaskParams): Promise<Task> {
    const createdTask = await TaskRepository.taskDB.create({
      account: params.accountId,
      title: params.title,
      description: params.description,
      isComplete: params.isComplete,
      
    });
    // if (existingTask) {
    //   throw new TaskWithNameExistsError(params.name);
    // }
    // const createdTask = await TaskRepository.taskDB.create({
    //   account: params.accountId,
    //   name: params.name,
    //   active: true,
    // });
    return TaskUtil.convertTaskDBToTask(createdTask);
  }

  public static async updateTask(params: UpdateTaskParams): Promise<Task> {
    // console.log(params.title);
    // console.log(params.description);
    // console.log(params.isComplete);
    // #This is for checking api
    const updatedTask = await TaskRepository.taskDB.findOneAndUpdate(
        {
            _id: params.taskId,
        },
        {
            $set: {
                title: params.title,
                description: params.description,
                isComplete: params.isComplete,
            }
        },
        {
            new: true,
        }
    );

    if(!updatedTask) {
      throw new TaskNotFoundError(params.taskId);
  }

  return TaskUtil.convertTaskDBToTask(updatedTask);
}

  public static async deleteTask(params: DeleteTaskParams): Promise<void> {
    const task = await TaskRepository.taskDB.findOneAndDelete({
        _id: params.taskId,
      });
      if(!task) {
        throw new TaskNotFoundError(params.taskId);
  }
}
}
