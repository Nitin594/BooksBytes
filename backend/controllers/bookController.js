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

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Fetching Books", error: error.message });
  }
};

export const lastFourBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 }).limit(4);
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in loading latest books", error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      deletedBook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete book",
      error: error.message,
    });
  }
};
