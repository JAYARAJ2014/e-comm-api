import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser, User } from '../models/user';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthorizedError } from '../custom-errors/';
import bcrypt from 'bcryptjs';
import { rmSync } from 'fs';
import { JwtUtil } from '../utils/jwt';

class ProductHandler { 

    public async createProduct(req: Request, res: Response) { 
        res.send('Create Product')
    }

    public async getAllProducts(req: Request, res: Response) { 
        res.send('getAllProducts')
    }

    public async getSingleProduct(req: Request, res: Response) { 
        res.send('getSingleProduct')
    }

    public async updateProduct(req: Request, res: Response) { 
        res.send('updateProduct')
    }
    public async deleteProduct(req: Request, res: Response) { 
        res.send('deleteProduct')
    }

    public async uploadImage(req: Request, res: Response) { 
        res.send('uploadImage')
    }

}
