import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ProductMediaSchema = new Schema({
  productImage: [
    {
      title: {
        type: String,
        trim: true,
      },
      url: {
        type: String,
        trim: true,
      },
    },
  ],

  peopleImage: [
    {
      title: {
        type: String,
        trim: true,
      },
      url: {
        type: String,
        trim: true,
      },
    },
  ],

  otherImage: [
    {
      title: {
        type: String,
        trim: true,
      },
      url: {
        type: String,
        trim: true,
      },
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});
