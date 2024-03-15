const Library = new class {
    #booksArr = [];
    #nextBookID = 1;

    #Book = class {
        constructor(title, author, pageCount, isFinished) {
            this.title = title;
            this.author = author;
            this.pageCount = pageCount;
            this.isFinished = isFinished;
            this.ID = Library.#nextBookID++;
        }
    }

    addNewBook(userInput) {
        let newBook = new this.#Book(...userInput);
        this.#booksArr.push(newBook);
    }

    removeBookWithId(bookCardId) {
        let indexInLibrary = Library.#booksArr.findIndex((book) => book.ID === +bookCardId);
        if (indexInLibrary >= 0)
            Library.#booksArr.splice(indexInLibrary, 1);
        else console.log("No book with such ID!");
    }
}
/*
Refactor as separate UserInterface class

function addBookToLibrary(userInput) {
    let newBook = new Book(...userInput, nextBookID);
    Library.push(newBook);

    // creation of book card on a page
    let newBookCard = document.createElement("div");
    newBookCard.classList.add("card");
    newBookCard.setAttribute("bookID", nextBookID);

    let title = document.createElement("p");
    title.classList.add("title");
    title.textContent = '"' + userInput[0] + '"';

    let author = document.createElement("p");
    author.classList.add("author");
    author.textContent = "by " + userInput[1];

    let pageCount = document.createElement("p");
    pageCount.classList.add("pages");
    pageCount.textContent = userInput[2] + " pages";

    let isFinished = document.createElement("button");
    isFinished.classList.add("status");
    if (userInput[3]) {
        isFinished.textContent = "Finished";
        isFinished.classList.add("finished");
    } else isFinished.textContent = "Not read";
    // isFinished toggle
    isFinished.addEventListener("click", () => {
        let result = isFinished.classList.toggle("finished");
        isFinished.textContent = result ? "Finished" : "Not read";
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", (e) => {
        //remove from Library object
        let cardID = e.target.parentNode.parentNode.getAttribute("bookID");
        let indexInLibrary = Library.findIndex((book) => book.ID === +cardID);
        Library.splice(indexInLibrary, 1);
        //remove from DOM
        e.target.parentNode.parentNode.remove();
    });

    let btnPanel = document.createElement("div");
    btnPanel.classList.add("buttonsPanel");
    btnPanel.append(isFinished, deleteBtn);

    newBookCard.append(title, author, pageCount, btnPanel);
    bookCards.append(newBookCard);
    nextBookID++;
};

const bookCards = document.querySelector(".bookCards");
const dialog = document.querySelector("dialog");
const addBookBtn = document.querySelector("dialog+button");
const cancelBtn = document.querySelector(".close");
const submitBtn = document.querySelector(".submit");
const inputsList = document.querySelectorAll("dialog div input");

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

        e.preventDefault();
        dialog.close();
        clearInput();
    }
});

function clearInput() {
    for (let i = 0; i < 3; i++) {
        inputsList[i].value = "";
    }
    inputsList[3].checked = false;
}
*/