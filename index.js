//imports
import express from "express";
import fs from "fs";

//global vars
const servExp = express();
const PORT = 3000;

//read JSON 
servExp.use(express.json());

//add book function
servExp.post("/add-book", (req, res) => {
    //get information
    let {bookName, isbn, author, yearPublished} = req.body;

    //check that all fields exist and are not empty strings
    if (
        typeof bookName !== "string" || bookName.trim() === "" ||
        typeof isbn !== "string" || isbn.trim() === "" ||
        typeof author !== "string" || author.trim() === "" ||
        typeof yearPublished !== "string" || yearPublished.trim() === ""
    ) {
        return res.json({ success: false });
    }
    //book name,isbn,author,year published
    let book = `${bookName},${isbn},${author},${yearPublished}\n`;

    //error handling
    fs.appendFile("books.txt", book, (err) => {
        if (err) {
            return res.json({ success: false });
        }

        res.json({ success: true });
    });
});

//find book by ISBN and author
servExp.get("/find-by-isbn-author", (req, res) => {

    const { isbn, author } = req.query;
    fs.readFile("books.txt", "utf8", (err, data) => {

        //error checking
        if (err) {
            return res.json({ success: false });
        }

        const books = data.split("\n");
        for (let book of books) {
            const [bookName, bookIsbn, bookAuthor, yearPublished] = book.split(",");

            if (bookIsbn === isbn && bookAuthor === author) {
                return res.json({
                    bookName: bookName,
                    isbn: bookIsbn,
                    author: bookAuthor,
                    yearPublished: yearPublished
                });
            }
        }
       
        res.json({ success: false });
    });
});

//find books by author
servExp.get("/find-by-author", (req, res) => {
    let { author } = req.query;
    fs.readFile("books.txt", "utf8", (err, data) => {

        //error checking
        if (err) {
            return res.json({ success: false });
        }

        let books = data.split("\n");
        let matchingBooks = [];

        for (let book of books) {

            //error checking because empty lines mess everything up
            if (book.trim() === "") {
                continue;
            }
            
            const [bookName, bookIsbn, bookAuthor, yearPublished] = book.split(",");
            if (bookAuthor === author) {
                matchingBooks.push({
                    bookName: bookName,
                    isbn: bookIsbn,
                    author: bookAuthor,
                    yearPublished: yearPublished
                });
            }
        }
        res.json(matchingBooks);
    });
});


servExp.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});