import {
  NextFunction, Request, Response,
} from 'express';

import TaskService from '../task-service';
import {
  Task,
  CreateTaskParams,
  GetAllTaskParams,
  UpdateTaskParams,
  DeleteTaskParams,
  GetTaskParams,
} from '../types';

export default class TaskController {
  public static async createTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: CreateTaskParams = {
        accountId: req.params.accountId,
        title: req.body.title as string,
        description: req.body.description as string,
        isComplete: req.body.isComplete as boolean,
      };
      const task: Task = await TaskService.createTask(params);
      res.status(201).send(TaskController.serializeTaskAsJSON(task));
    } catch (e) {
      next(e);
    }
  }
    public static async updateTask(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const params: UpdateTaskParams = {
                accountId: req.params.accountId,
                taskId: req.params.id,
                title: req.body.title,
                description: req.body.description,
                isComplete: req.body.isComplete as boolean,
            };
            const task: Task = await TaskService.updateTask(params);
            res.status(200).send(TaskController.serializeTaskAsJSON(task));
        } catch(e) {
            next(e);
        }
    }

  public static async deleteTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: DeleteTaskParams = {
        accountId: req.params.accountId,
        taskId: req.params.id,
      };
      await TaskService.deleteTask(params);
      res.status(204).send(`Task Deletion completed successfully: ${params}`);
    } catch (e) {
      next(e);
    }
  }

  public static async getAllTasks(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise <void> {
    try {
      // const page = +req.query.page;
      // const size = +req.query.size;
      const params: GetAllTaskParams = {
        accountId: req.params.accountId,
        // page,
        // size,
      };
      const tasks = await TaskService.getTasksForAccount(params);
      res.status(200).send(tasks.map((task) => TaskController.serializeTaskAsJSON(task)));
    } catch (e) {
      next(e);
    }
  }
// may be here i can use filter
  public static async getTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params: GetTaskParams = {
        accountId: req.params.accountId,
        taskId: req.params.id,
      };
      const task = await TaskService.getTaskForAccount(params);
      res.status(200).send(TaskController.serializeTaskAsJSON(task));
    } catch (e) {
      next(e);
    }
  }

  private static serializeTaskAsJSON(task: Task): unknown {
    return {
      id: task.id,
      account: task.account,
      title: task.title,
      description: task.description,
      isComplete: task.isComplete,
    };
  }
}
