import { connect } from 'mongoose';

export const connectDb = (url: string) => {
  return connect(url);
};
