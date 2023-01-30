import { Router } from 'express';

import 'express-async-errors';
import { handleAsyncMiddleware, authMiddleware } from '../middlewares/';
import { productHandler } from '../handlers/product';
import { UserRoleEnum } from '../models/user';
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
  .get(
    authMiddleware.authenticate,
    handleAsyncMiddleware(productHandler.getSingleProduct)
  );
productRouter
  .route('/')
  .get(
    authMiddleware.authenticate,
    handleAsyncMiddleware(productHandler.getAllProducts)
  );
productRouter
  .route('/:id')
  .patch(
    authMiddleware.authenticate,
    authMiddleware.authorizeByRole(UserRoleEnum.ADMIN),
    handleAsyncMiddleware(productHandler.updateProduct)
  );
productRouter
  .route('/uploadImage/:id')
  .patch(
    authMiddleware.authenticate,
    authMiddleware.authorizeByRole(UserRoleEnum.ADMIN),
    handleAsyncMiddleware(productHandler.uploadImage)
  );
