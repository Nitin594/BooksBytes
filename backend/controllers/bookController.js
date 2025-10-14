import Book from "../models/Book.model.js";

export const uploadBook = async (req, res) => {
  try {
    // data from body
    const { title, author, description, genre, coverImageUrl, isAvailable } =
      req.body;
    // check for all fields
    if (
      !title ||
      !author ||
      !description ||
      !genre ||
      !coverImageUrl ||
      !isAvailable === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // create new book
    const newBook = await Book.create({
      title,
      author,
      description,
      genre,
      coverImageUrl,
      isAvailable,
    });
    res.status(200).json({
      message: "Your new book is added",
      book: {
        id: newBook._id,
        title: newBook.title,
        author: newBook.author,
        genre: newBook.genre,
        coverImageUrl: newBook.coverImageUrl,
        isAvailable: newBook.isAvailable,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in Book upload", error: error.message });
  }
};
