import { Router } from 'express';
import 'express-async-errors';
import { handleAsyncMiddleware, authMiddleware } from '../middlewares/';
import { productHandler } from '../handlers/product';
import { UserRoleEnum } from '../models/user';
import { reviewHandler } from '../handlers/review';
export const productRouter: Router = Router();

productRouter
  .route('/')
  .post(
    authMiddleware.authenticate,
    authMiddleware.authorizeByRole(UserRoleEnum.ADMIN),
    handleAsyncMiddleware(productHandler.createProduct)
  );

productRouter
  .route('/:id')
  .delete(
    authMiddleware.authenticate,
    authMiddleware.authorizeByRole(UserRoleEnum.ADMIN),
    handleAsyncMiddleware(productHandler.deleteProduct)
  );

productRouter
  .route('/:id')
  .get(handleAsyncMiddleware(productHandler.getSingleProduct));

productRouter
  .route('/:id/reviews')
  .get(handleAsyncMiddleware(reviewHandler.getSingleProductReviews));

productRouter
  .route('/')
  .get(handleAsyncMiddleware(productHandler.getAllProducts));

productRouter
  .route('/:id')
  .patch(
    authMiddleware.authenticate,
    authMiddleware.authorizeByRole(UserRoleEnum.ADMIN),
    handleAsyncMiddleware(productHandler.updateProduct)
  );

productRouter
  .route('/images/:id')
  .post(
    authMiddleware.authenticate,
    authMiddleware.authorizeByRole(UserRoleEnum.ADMIN),
    handleAsyncMiddleware(productHandler.uploadImage)
  );
