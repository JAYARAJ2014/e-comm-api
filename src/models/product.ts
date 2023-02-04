import mongoose, { Schema, model } from 'mongoose';
import { IUser } from './user';
import { Review } from './review';

export interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  manufacturer: string;
  colors: string[];
  featured: boolean;
  freeShipping: boolean;
  inventory: number;
  averageRating: number;
  user: IUser;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [
        true,
        'Please provide a name that is at least 3 chars long and does not exceed 50 chars'
      ],
      maxlength: [100, 'Max 100 charecters'],
      minlength: 3
    },
    price: {
      type: Number,
      min: [0, 'Minimum 0']
    },
    description: {
      type: String,
      maxlength: [1000, 'Max 1000 charecters']
    },
    image: {
      type: String,
      default: '/images/example.png'
    },
    category: {
      type: String,
      required: [true, 'Category mandatory'],
      enum: ['office', 'kitchen', 'bedroom']
    },

    manufacturer: {
      type: String,
      required: true,
      maxlength: [100, 'Max 100 chars']
    },
    colors: {
      type: [String],
      required: true
    },
    featured: {
      type: Boolean,
      default: false
    },
    freeShipping: { type: Boolean, default: false },
    inventory: { type: Number, min: 0, required: true, default: 0 },
    averageRating: { type: Number, default: 0 },
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false
});

/***
 * .remove() will trigger this hook
 * We use this to remove associated reviews
 ***/

ProductSchema.pre('remove', async function removeAssociatedReviews() {});
export const Product = model<IProduct>('Product', ProductSchema);
