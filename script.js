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

function addBookToLibrary(userInput) {
    let newBook = new Book(...userInput);
    Library.push(newBook);

    // creation of book card on a page
    let newBookCard = document.createElement("div");
    newBookCard.classList.add("card");

    let title = document.createElement("p");
    title.classList.add("title");
    title.textContent = userInput[0];

    let author = document.createElement("p");
    author.classList.add("author");
    author.textContent = userInput[1];

    let pageCount = document.createElement("p");
    pageCount.classList.add("pages");
    pageCount.textContent = userInput[2];

    let isFinished = document.createElement("button");
    isFinished.classList.add("status");
    if (userInput[3]) {
        isFinished.textContent = "Finished";
        isFinished.classList.add("finished");
    } else isFinished.textContent = "Not read";

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove");
    deleteBtn.textContent = "Delete";

    let btnPanel = document.createElement("div");
    btnPanel.classList.add("buttonsPanel");
    btnPanel.append(isFinished, deleteBtn);

    newBookCard.append(title, author, pageCount, btnPanel);
    bookCards.append(newBookCard);
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

addBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    dialog.close();
    clearInput()
});

submitBtn.addEventListener("click", (e) => {
    let inputArray = Array.from(inputsList);
    let validityArr = inputArray.map((userInput) => userInput.validity.valid);

    if (!validityArr.includes(false)) {
        let inputValues = inputArray.map((userInput) => userInput.value);
        // input[3](checkbox) value is "on" instead of true/false, so we take it separately
        inputValues[3] = inputArray[3].checked;
        addBookToLibrary(inputValues);
        dialog.close();
        clearInput();
    }
});

function clearInput() {
    for(let i = 0; i < 3; i++) {
        inputsList[i].value = "";
    }
    inputsList[3].checked = false;
}

