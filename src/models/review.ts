import mongoose, { Schema, model } from 'mongoose';
import validator from 'validator';

export interface IReview {
  rating: number;
  title: string;
  comment: string;
  product: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId | string;
}

const ReviewSchema = new Schema<IReview>(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'A Rating must be provided']
    },
    title: {
      type: String,
      minlength: 5,
      max: 100,
      trim: true,
      required: [true, 'A Title must be provided']
    },
    comment: {
      type: String,
      minlength: 3,
      max: 1000,
      required: [true, 'A Comment must be provided']
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    }
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });
export const Review = model<IReview>('Review', ReviewSchema);
