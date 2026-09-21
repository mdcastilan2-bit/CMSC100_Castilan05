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

servExp.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});