/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import AccountController from './account-controller';

export default class AccountRouter {
  public static getRoutes(): Router {
    const router = Router();
// connected with account controller 
    router.post('/register', AccountController.registerAccount);
    router.post('/login', AccountController.loginAccount);
    return router;
  }
}
/* eslint-disable @typescript-eslint/no-misused-promises */



    
    


