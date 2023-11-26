import { NextFunction, Request, Response } from 'express';

import AccountService from '../account-service';
import { Account, AccountSearchParams, CreateAccountParams } from '../types';
// imported accountsearchparams
export default class AccountController {
  public static async registerAccount(
  // registeraccount
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { username, name, password }: CreateAccountParams = req.body as CreateAccountParams;
      const params: CreateAccountParams = { username, name, password };
      const account = await AccountService.registerAccount(params);
      // createaccount 
      res.status(201).send(AccountController.serializeAccountAsJSON(account));
    } catch (e) {
      next(e);
    }
  }
  public static async loginAccount(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { username, password }: AccountSearchParams = req.body as AccountSearchParams;
      const params: AccountSearchParams = {username, password};
      const account = await AccountService.getAccountByUsernamePassword(params);
      res.status(200).send(AccountController.serializeAccountAsJSON(account));
    } catch(e) {
      next(e);
    }
  }


  private static serializeAccountAsJSON(account: Account): unknown {
    return {
      id: account.id,
      name: account.name,
    //  i dont think its required here, when u read the api, it gives id,name,username
      username: account.username,
    };
  }
}
