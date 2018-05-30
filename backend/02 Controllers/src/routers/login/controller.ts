import { Request, Response } from 'express';

export const LoginController = () => ({
  post: (req: Request, res: Response) => {
    isValidLogin(req.body.login, req.body.password) ?
      res.sendStatus(201) :
      res.sendStatus(401);
  },
});

const isValidLogin = (login: string, password: string) => (
  login === 'admin' &&
  password === 'test'
);
