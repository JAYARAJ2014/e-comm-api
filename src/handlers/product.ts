import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../custom-errors/';
import { IProduct, Product } from '../models/product';
import { UploadedFile } from 'express-fileupload';
import path from 'path';

class ProductHandler {
  public async createProduct(req: Request, res: Response) {
    req.body.user = req.user?.userId;
    const product: IProduct = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
  }

  public async getAllProducts(req: Request, res: Response) {
    const products: IProduct[] = await Product.find({}).select('-user');
    res
      .status(StatusCodes.OK)
      .json({ products: products, count: products.length });
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
    console.log('Update requested: ', req.body);
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
    await product.remove();
    res
      .status(StatusCodes.OK)
      .json({ message: `Product Deleted`, product: product });
  }

  public async uploadImage(req: Request, res: Response) {
    if (!req.files) {
      throw new BadRequestError('Thre are no files selected to upload');
    }
    const image: UploadedFile = req.files?.image as UploadedFile;
    if (!image) {
      throw new BadRequestError('No images found');
    }

    if (!image.mimetype.startsWith('image')) {
      throw new BadRequestError('No images found');
    }
    const maxSize = 1024 * 1024;
    if (image.size > maxSize) {
      throw new BadRequestError(`Upload size exceeds ${maxSize} bytes`);
    }

    const imagePath = path.join(__dirname, '../../public/images', image.name);
    await image.mv(imagePath);
    res
      .status(StatusCodes.OK)
      .json({
        message: 'Image succesfully uploaded',
        url: req.headers.host + `/images/${image.name}`
      });
  }
}

export const productHandler = new ProductHandler();
