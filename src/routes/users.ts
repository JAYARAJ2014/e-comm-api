import { Router } from 'express';

import 'express-async-errors';
import { handleAsyncMiddleware, authMiddleware } from '../middlewares/';
import { UsersHandler } from '../handlers/users';
import { UserRoleEnum } from '../models/user';

export const usersHandler = new UsersHandler();
export const usersRouter: Router = Router();

usersRouter
  .route('/')
  .get(
    authMiddleware.authenticate,
    authMiddleware.authorizeByRole(UserRoleEnum.ADMIN),
    handleAsyncMiddleware(usersHandler.getAllUsers)
  );

usersRouter
  .route('/current')
  .get(
    authMiddleware.authenticate,
    handleAsyncMiddleware(usersHandler.showCurrentUser)
  );
usersRouter
  .route('/:id')
  .get(
    authMiddleware.authenticate,
    handleAsyncMiddleware(usersHandler.getSingleUser)
  );
usersRouter
  .route('/password')
  .patch(
    authMiddleware.authenticate,
    handleAsyncMiddleware(usersHandler.updateUserPassword)
  );
usersRouter.route('/').post(handleAsyncMiddleware(usersHandler.createUser));

usersRouter
  .route('/')
  .patch(
    authMiddleware.authenticate,
    handleAsyncMiddleware(usersHandler.updateCurrentUser)
  );
