import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../custom-errors/';
import { IProduct, Product } from '../models/product';
import { UploadedFile } from 'express-fileupload';
import path from 'path';

class ReviewHandler {
    public async createReview(req: Request, res: Response) {
        res.status(StatusCodes.OK).json("createReview")
    }
    public async getAllReviews(req: Request, res: Response) {
        res.send("getAllReviews")
    }
    public async getSingleReview(req: Request, res: Response) {
        res.send("getSingleReview")
    }

    public async updateReview(req: Request, res: Response) {
        res.send("updateReview")
    }
    public async deleteReview(req: Request, res: Response) {
        res.send("deleteReview")
    }
} 

export const reviewHandler = new ReviewHandler();