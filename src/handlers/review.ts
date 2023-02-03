import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError
} from '../custom-errors/';
import { IProduct, Product } from '../models/product';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { Review } from '../models/review';
import { User, UserRoleEnum } from '../models/user';
import { userInfo } from 'os';
import mongoose, { ObjectId } from 'mongoose';

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
      throw new NotFoundError('The product you have specified does not exist');
    }

    const alreadyReviewed = await Review.findOne({
      product: productId,
      user: req.user?.userId
    });
    if (alreadyReviewed) {
      throw new BadRequestError('You have already reviewed this product');
    }

    const review = await Review.create({ ...req.body, user: req.user?.userId });

    res.status(StatusCodes.OK).json(review);
  }
  public async getAllReviews(req: Request, res: Response) {
    const reviews = await Review.find({})
      .populate({
        path: 'product',
        select: 'name price manufacturer'
      })
      .populate({ path: 'user', select: 'name' });

    res
      .status(StatusCodes.OK)
      .json({ reviews: reviews, count: reviews.length });
  }
  public async getSingleReview(req: Request, res: Response) {
    const { id: reviewId } = req.params;
    const review = await Review.findOne({ _id: reviewId })
      .populate({
        path: 'product',
        select: 'name price manufacturer description'
      })
      .populate({ path: 'user', select: 'name' });
    if (!review) {
      throw new NotFoundError('Review not found');
    }
    res.status(StatusCodes.OK).json(review);
  }

  public async updateReview(req: Request, res: Response) {
    const { id: reviewId } = req.params;

    const review = await Review.findOne({ _id: reviewId });

    if (!review) {
      throw new NotFoundError('Review not found');
    }
    console.log(`req.user?.role`, req.user?.role);
    console.log(`req.user.userId `, req.user?.userId);
    console.log(`review.user`, review.user);

    if (req.user?.userId === (review.user as string)) {
      throw new UnAuthorizedError(
        'Onlycreator of the review is allowed to update it'
      );
    }
    const { rating, title, comment } = req.body;
    review.rating = rating;
    review.title = title;
    review.comment = comment;

    await review.save();

    res.status(StatusCodes.OK).json({ messgae: 'Updated review', review });
  }

  public async deleteReview(req: Request, res: Response) {
    const { id: reviewId } = req.params;

    const review = await Review.findOne({ _id: reviewId });

    if (!review) {
      throw new NotFoundError('Review not found');
    }
    console.log(`req.user?.role`, req.user?.role);
    console.log(`req.user.userId `, req.user?.userId);
    console.log(`review.user`, review.user);

    if (
      req.user?.role === UserRoleEnum.ADMIN ||
      req.user?.userId === (review.user as string)
    ) {
      throw new UnAuthorizedError(
        'Only admin or creator of the review is allowed to delete the review'
      );
    }

    const removed = await review.remove();

    res
      .status(StatusCodes.OK)
      .json({ messgae: 'Removed review', review: removed });
  }
}

export const reviewHandler = new ReviewHandler();
