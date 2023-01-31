import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser, User } from '../models/user';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError
} from '../custom-errors/';
import bcrypt from 'bcryptjs';
import { rmSync } from 'fs';
import { JwtUtil } from '../utils/jwt';
import { IProduct, Product } from '../models/product';

class ProductHandler {
  public async createProduct(req: Request, res: Response) {
    req.body.user = req.user?.userId;
    const product: IProduct = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
  }

  public async getAllProducts(req: Request, res: Response) {
    const products: IProduct[] = await Product.find({}).select('-user');
      res.status(StatusCodes.OK).json({ products: products, count: products.length } );
  }

  public async getSingleProduct(req: Request, res: Response) {
    const product = await Product.findOne({ _id: req.params.id }).select(
      '-user'
    );
    if (!product) {
      throw new NotFoundError(
        `Product with Id ${req.params.id} does not exist`
      );
    }
    res.status(StatusCodes.OK).json(product);
  }

  public async updateProduct(req: Request, res: Response) {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!product) {
      throw new NotFoundError(
        `Product with Id ${req.params.id} does not exist`
      );
    }
    res
      .status(StatusCodes.OK)
      .json({ message: `Product Updated`, product: product });
  }
  public async deleteProduct(req: Request, res: Response) {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      throw new NotFoundError(
        `Product with Id ${req.params.id} does not exist`
      );
    }
    res
      .status(StatusCodes.OK)
      .json({ message: `Product Deleted`, product: product });
  }

  public async uploadImage(req: Request, res: Response) {
    res.send('uploadImage');
  }
}

export const productHandler = new ProductHandler();
