import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A book must have a title.'],
      unique: true,
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'A book must have an author.'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'A book must have a description.'],
    },
    // genre: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Genre', // This creates a reference to the Genre model
    //   required: [true, 'A book must belong to a genre.'],
    // },
    genre: {
      type: String,
      required: [true, 'A book must have a genre.'],
      // enum: [
      //   'Fiction',
      //   'Non-Fiction',
      //   'Science Fiction',
      //   'Fantasy',
      //   'Biography',
      //   'Mystery',
      //   'Romance',
      //   'Self-Help',
      //   'History',
      //   'Children',
      //   'horror'
      // ],
    },
    coverImageUrl: {
      type: String,
      required: [true, 'A book must have a cover image URL.'],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    // This option automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;