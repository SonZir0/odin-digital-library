const Library = [];
const bookCards = document.querySelector(".bookCards");
const dialog = document.querySelector("dialog");
const addBookBtn = document.querySelector("dialog+button");
const cancelBtn = document.querySelector(".close");
const submitBtn = document.querySelector(".submit");
const inputsList = document.querySelectorAll("dialog div input");

function Book(title, author, pageCount, isFinished) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.isFinished = isFinished;
}

addBookToLibrary = function (userInput) {
    let newBook = new Book(...userInput);
    Library.push(newBook);
};

Book.prototype.removeFromLibrary = function () {
    if (Library.includes(this))
        Library.splice(Library.indexOf(this), 1);
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


addBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    dialog.close();
});

submitBtn.addEventListener("click", (e) => {
    let inputArray = Array.from(inputsList);
    let validityArr = inputArray.map((userInput) => userInput.validity.valid);

    if (!validityArr.includes(false)) {
        let inputValues = inputArray.map((userInput) => userInput.value);
        // input[3](checkbox) value is "on" instead of true/false, so we take it separately
        inputValues[3] = inputArray[3].checked;
        addBookToLibrary(inputValues);
    }
});

