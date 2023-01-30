import { Router } from 'express';

import 'express-async-errors';
import { handleAsyncMiddleware, authMiddleware } from '../middlewares/';
import { productHandler } from '../handlers/product';
export const productRouter: Router = Router();

productRouter.post('/', handleAsyncMiddleware(productHandler.createProduct));
productRouter.delete('/:id', handleAsyncMiddleware(productHandler.deleteProduct)); 
productRouter.get('/:id', handleAsyncMiddleware(productHandler.getSingleProduct)); 
productRouter.get('/', handleAsyncMiddleware(productHandler.getAllProducts)); 
productRouter.patch('/:id', handleAsyncMiddleware(productHandler.updateProduct)); 
productRouter.patch('/uploadImage/:id', handleAsyncMiddleware(productHandler.uploadImage)); 
