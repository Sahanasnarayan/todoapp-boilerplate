import { Task } from '../types';

import { TaskDB } from './store/task-db';

export default class TaskUtil {
  public static convertTaskDBToTask(taskDb: TaskDB): Task {
    const task = new Task();
    task.id = taskDb._id.toString();
    task.account = taskDb.account.toString();
    task.title = taskDb.title;
    task.description= taskDb.description;
    task.isComplete= taskDb.isComplete;
    return task;
  }
}
