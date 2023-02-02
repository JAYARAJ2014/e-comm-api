import { Router } from 'express';

import 'express-async-errors';
import { handleAsyncMiddleware, authMiddleware } from '../middlewares/';
import { productHandler } from '../handlers/product';
import { UserRoleEnum } from '../models/user';
import { reviewHandler } from '../handlers/review';
export const reviewRouter: Router = Router();

reviewRouter
  .route('/')
  .post(
    authMiddleware.authenticate,
    authMiddleware.authorizeByRole(UserRoleEnum.USER),
    handleAsyncMiddleware(reviewHandler.createReview)
  );
  reviewRouter
  .route('/')
  .get(
     handleAsyncMiddleware(reviewHandler.getAllReviews)
  );
  reviewRouter
  .route('/:id')
  .get(
     handleAsyncMiddleware(reviewHandler.getSingleReview)
  );
  reviewRouter
  .route('/:id')
  .patch(
    authMiddleware.authenticate,
    authMiddleware.authorizeByRole(UserRoleEnum.USER),
    handleAsyncMiddleware(reviewHandler.updateReview)
  );
  reviewRouter
  .route('/:id')
  .delete(
    authMiddleware.authenticate,
    authMiddleware.authorizeByRole(UserRoleEnum.USER),
    handleAsyncMiddleware(reviewHandler.deleteReview)
  );