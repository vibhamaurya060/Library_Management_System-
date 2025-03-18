const bookModel = require("../models/book.model")

const getBooks=async(req, res)=>{
   try {
    const books=await bookModel.find();
    res.status(200).json({books: books})
   } catch (error) {
    res.status(500).json({message: "Server error"})
   }
}

const addBook= async(req, res)=>{
    try {
        const newBook = await bookModel.create(req.body);
        res.status(201).json({book: newBook});

    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}

const getBookById = async(req, res)=>{
    try {
        const book=await bookModel.findById(req.params.id);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}

module.exports={addBook, getBooks, getBookById}