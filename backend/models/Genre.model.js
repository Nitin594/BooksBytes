import mongoose from 'mongoose';

const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A genre must have a name.'],
      unique: true,
      trim: true,
      minLength: [3, 'Genre name must be at least 3 characters long.'],
      maxLength: [50, 'Genre name cannot be more than 50 characters long.'],
    },
  },
  {
    timestamps: true,
  }
);

const Genre = mongoose.model('Genre', genreSchema);

export default Genre;