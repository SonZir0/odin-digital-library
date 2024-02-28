const Library = [];

function Book(title, author, pageCount, isFinished) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.isFinished = isFinished;
}

Book.prototype.addBookToLibrary = function() {
    Library.push(this);
};

Book.prototype.removeFromLibrary = function() {
    if (Library.includes(this))
        Library.splice(Library.indexOf(this),1);
    else console.log("No such book in the library!");
};

function logAllBooks() {
    Library.forEach(Book => {
        let lastPart = Book.isFinished ?
            "You have already read this book." :
            "You haven't read this book yet.";
        console.log(`This is "${Book.title}" by ${Book.author}. This book is ${Book.pageCount} pages long.
         ${lastPart}`);
    });
}

// modal dialog stuff 
const dialog = document.querySelector("dialog");
const newBook = document.querySelector("dialog+button");
const closeDialog = document.querySelector(".close");

newBook.addEventListener("click", () => {
    dialog.showModal();
});

closeDialog.addEventListener("click", () => {
    dialog.close();
});