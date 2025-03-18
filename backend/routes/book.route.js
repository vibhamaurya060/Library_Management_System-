const express = require("express");
const { getBooks, addBook, getBookById } = require("../controllers/book.controller");
const { authMiddleware, roleMiddleware } = require("../middleware/auth.middleware");

const bookRouter = express.Router();

bookRouter.get("/", getBooks);
bookRouter.post('/add-book', authMiddleware, roleMiddleware('admin'),  addBook);
bookRouter.get("/:id", getBookById);

module.exports = bookRouter;