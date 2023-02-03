import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../custom-errors/';
import { IProduct, Product } from '../models/product';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { Review } from '../models/review';

class ReviewHandler {
  public async createReview(req: Request, res: Response) {
    /***
     * Check product in thebody
     * Attach a user property
     * create review
     */
      const { product: productId } = req.body;
      const validProduct = Product.findOne({ _id: productId });
      if (!validProduct) {
          throw new NotFoundError("The product you have specified does not exist")
      }
      
      const alreadyReviewed = await Review.findOne({product:productId, user:req.user?.userId})
      if (alreadyReviewed) {
          throw new BadRequestError("You have already reviewed this product")
      }

      const review = await Review.create({ ...req.body, user: req.user?.userId })

    res.status(StatusCodes.OK).json(review);
  }
  public async getAllReviews(req: Request, res: Response) {
    res.send('getAllReviews');
  }
  public async getSingleReview(req: Request, res: Response) {
    res.send('getSingleReview');
  }

  public async updateReview(req: Request, res: Response) {
    res.send('updateReview');
  }
  public async deleteReview(req: Request, res: Response) {
    res.send('deleteReview');
  }
}

export const reviewHandler = new ReviewHandler();
