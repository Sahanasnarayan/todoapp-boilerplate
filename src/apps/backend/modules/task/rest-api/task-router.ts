import { Router } from 'express';

import AccountAuthMiddleware from '../../access-token/rest-api/account-auth-middleware';

import TaskController from './task-controller';

export default class TaskRouter {
  public static getRoutes(): Router {
    const router = Router({ mergeParams: true });

    router.post('/add', AccountAuthMiddleware.ensureAccess, TaskController.createTask);
    router.get('/getall', AccountAuthMiddleware.ensureAccess, TaskController.getAllTasks);
    router.get('/get/:id', AccountAuthMiddleware.ensureAccess, TaskController.getTask);
    router.put('/update/:id', AccountAuthMiddleware.ensureAccess, TaskController.updateTask);
    router.delete('delete/:id', AccountAuthMiddleware.ensureAccess, TaskController.deleteTask);
  //  all 4 api works except for delete api
    return router;
  }
}




