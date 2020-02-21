import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const PageSchema = new Schema({
  id: {
    type: String,
    required: true,
    trim: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  page: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  options: [
    {
      id: {
        type: String,
        required: true,
        trim: true,
      },
      template: {
        type: String,
        required: true,
        trim: true,
      },
      isValid: {
        type: Boolean,
        // required: true,
        trim: true,
      },
      title: {
        type: String,
        //  required: true,
        trim: true,
      },
      description: {
        type: String,
        //   required: true,
        trim: true,
      },
      options: {},
    },
  ],
});

// [
//         {
//           id: {
//             type: String,
//             required: true,
//             trim: true,
//           },
//           component: {
//             type: String,
//             required: true,
//             trim: true,
//           },
//           isValid: {
//             type: Boolean,
//             required: true,
//             trim: true,
//           },
//           title: {
//             type: String,
//             //   required: true,
//             trim: true,
//           },
//           description: {
//             type: String,
//             //   required: true,
//             trim: true,
//           },
//           image: {
//             type: String,
//             //   required: true,
//             trim: true,
//           },

//           imageUrl: {
//             type: String,
//             //   required: true,
//             trim: true,
//           },
//           titleUrl: {
//             type: String,
//             //   required: true,
//             trim: true,
//           },
//           descriptionUrl: {
//             type: String,
//             //   required: true,
//             trim: true,
//           },

//           product:{}|| null
//         },
//       ],
