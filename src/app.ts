import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { connectDb } from './db/connect';
import {
  notFoundMiddleware,
  errorHandlerMiddleware,
  handleAsyncMiddleware
} from './middlewares';
import morgan from 'morgan';
import { authRouter } from './routes/auth';
import cookieParser from 'cookie-parser';
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || '';
const BASE_URL = process.env.BASE_URL || '';
const MORGAN_LOG_FORMAT = process.env.MORGAN_LOG_FORMAT || 'tiny';

const app: Express = express();
app.use(morgan(MORGAN_LOG_FORMAT));

app.use(express.json());
app.use(cookieParser());

app.use(`${BASE_URL}/auth`, authRouter);
app.use('/', (req: Request, res: Response) => {
  console.log(req.cookies);

  res.status(StatusCodes.OK).json({ message: 'e-commerce API' });
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const appStart = async () => {
  try {
    await connectDb(MONGO_URI);
    console.log(`Established database connection`);
    app.listen(PORT, () => {
      console.log(`Express Server listening at PORT: ${PORT}`);
    });
  } catch (error) {
    console.log(`Exceptoin Occured at Startup : ${error}`);
  }
};

appStart();
