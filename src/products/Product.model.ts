import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ProductSchema = new Schema({
  pending: {
    type: Boolean,
    default: true,
  },

  views: {
    type: Number,
    default: 19,
  },
  date: {
    type: Date,
    default: Date.now,
    unique: true,
  },
  isUpdated: {
    type: Boolean,
    default: false,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  productSource: {
    type: String,
    required: true,
    trim: true,
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  updaterId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  price: {
    type: String,
    required: true,
    trim: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },
  subTitle: {
    type: String,
    required: true,
    trim: true,
  },
  categorie: {
    type: String,
    required: true,
    trim: true,
  },
  subCategorie: {
    type: String,
    required: true,
    trim: true,
  },
  subSubCategorie: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  link: {
    type: String,
    required: true,
    trim: true,
  },
  othersProductSources: [
    {
      productSource: {
        type: String,

        trim: true,
      },
      link: {
        type: String,

        trim: true,
      },
      price: {
        type: String,
      },
    },
  ],
  productReview: {
    type: Schema.Types.ObjectId,
    ref: 'product_review',
    trim: true,
    required: true,
  },

  productMedia: {
    type: Schema.Types.ObjectId,
    ref: 'product_media',
    trim: true,
    required: true,
  },
});
