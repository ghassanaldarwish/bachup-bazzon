import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  icon: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  locale: {
    type: String,
    trim: true,
  },
  emailVerified: {
    type: String || Boolean,
    trim: true,
    required: true,
  },
  provider: {
    type: String,
    trim: true,
    required: true,
  },
  thirdPartyId: {
    type: String,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  titel: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  username: {
    type: String,
    trim: true,
  },
  createArticles: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
  updateArticles: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
  deleteArticles: {
    type: Number,
    default: 0,
  },
  idAddress: [
    {
      type: String,
    },
  ],
  lastVisit: {
    type: Date,
    default: Date.now,
  },
  superAdmin: {
    type: Boolean,
    default: false,
  },

  admin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// session_requests: [
//   {
//     current_page_id: {
//       type: String,
//     },
//     current_page_path: {
//       type: String,
//     },
//     date: {
//       type: Date,
//       default: Date.now,
//     },
//   },
// ],
