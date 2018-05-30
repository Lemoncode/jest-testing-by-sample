import { Router } from 'express';
import { LoginController } from './controller';

export const loginRouter = () => {
  const router = Router();
  const controller = LoginController();
  router.route('/')
    .post(controller.post);

  return router;
};
