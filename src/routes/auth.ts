import { Router } from 'express';

import 'express-async-errors';
import { handleAsyncMiddleware, authMiddleware } from '../middlewares/';
import { authHandler } from '../handlers/auth';

export const authRouter: Router = Router();

authRouter.post('/register', handleAsyncMiddleware(authHandler.register));
authRouter.post('/login', handleAsyncMiddleware(authHandler.login));
authRouter.get('/logout', handleAsyncMiddleware(authHandler.logout));
