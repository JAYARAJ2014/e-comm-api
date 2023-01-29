import { Router } from 'express';

import 'express-async-errors';
import { handleAsyncMiddleware, authMiddleware } from '../middlewares/';
import { UsersHandler } from '../handlers/users';

export const usersHandler = new UsersHandler();
export const usersRouter: Router = Router();

usersRouter.route('/').get(authMiddleware, handleAsyncMiddleware(usersHandler.getAllUsers));
usersRouter.route('/:id').get( authMiddleware,handleAsyncMiddleware(usersHandler.getSingleUser));
usersRouter.route('/current').get(handleAsyncMiddleware(usersHandler.showCurrentUser));
usersRouter.route('/:id').patch(handleAsyncMiddleware(usersHandler.updateUser));
usersRouter.route('/password').patch(handleAsyncMiddleware(usersHandler.updateUserPassword));
usersRouter.route('/').post(handleAsyncMiddleware(usersHandler.createUser));


