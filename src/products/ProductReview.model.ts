import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ProductReviewSchema = new Schema({
  reviewId: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: [],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
