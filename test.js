//valid test

const response = await fetch("http://localhost:3000/add-book", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        bookName: "The Hobbit",
        isbn: "9780547928227",
        author: "J.R.R. Tolkien",
        yearPublished: "1937"
    })
});

const result = await response.json();

console.log(result);

/*invalid test

const response = await fetch("http://localhost:3000/add-book", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        bookName: "The Hobbit",
        isbn: "",
        author: "J.R.R. Tolkien",
        yearPublished: "1937"
    })
});

const result = await response.json();
console.log(result);
*/