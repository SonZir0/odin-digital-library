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

    get nextBookID() {
        return this.#nextBookID;
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

const UserInterface = new class {
    dialog = document.querySelector("dialog");
    addBookBtn = document.querySelector("dialog+button");
    cancelBtn = document.querySelector(".close");
    submitBtn = document.querySelector(".submit");
    inputsList = document.querySelectorAll("dialog div input");
    bookCards = document.querySelector(".bookCards");

    constructor() {
        this.addBookBtn.addEventListener("click", () => {
            this.dialog.showModal();
        })

        this.cancelBtn.addEventListener("click", () => {
            this.dialog.close();
            this.clearInput()
        })

        this.submitBtn.addEventListener("click", (e) => {
            let inputArray = Array.from(this.inputsList);
            let validityArr = inputArray.map((inputElem) => inputElem.validity.valid);
        
            if (!validityArr.includes(false)) {
                let inputValues = inputArray.map((inputElem) => inputElem.value);
                // input[3](checkbox) value is "on" instead of true/false, so we take it separately
                inputValues[3] = inputArray[3].checked;
                this.createNewBook(inputValues);
        
                e.preventDefault();
                this.dialog.close();
                this.clearInput();
            }
        })
    }

    clearInput() {
        for (let i = 0; i < 3; i++) {
            this.inputsList[i].value = "";
        }
        this.inputsList[3].checked = false;
    }

    // create book and bookCard, display new bookCard
    createNewBook(inputValues) {
        
        let newBookCard = document.createElement("div");
        newBookCard.classList.add("card");
        newBookCard.setAttribute("bookID", Library.nextBookID);
    
        let title = document.createElement("p");
        title.classList.add("title");
        title.textContent = '"' + inputValues[0] + '"';
    
        let author = document.createElement("p");
        author.classList.add("author");
        author.textContent = "by " + inputValues[1];
    
        let pageCount = document.createElement("p");
        pageCount.classList.add("pages");
        pageCount.textContent = inputValues[2] + " pages";
    
        let isFinished = document.createElement("button");
        isFinished.classList.add("status");
        if (inputValues[3]) {
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
            let cardID = e.target.parentNode.parentNode.getAttribute("bookID");
            Library.removeBookWithId(cardID);
            e.target.parentNode.parentNode.remove();
        });
    
        let btnPanel = document.createElement("div");
        btnPanel.classList.add("buttonsPanel");
        btnPanel.append(isFinished, deleteBtn);
    
        newBookCard.append(title, author, pageCount, btnPanel);
        this.bookCards.append(newBookCard);
        // after addNewBook() runs nextBookID increments, so we invoke it at the end
        Library.addNewBook(inputValues);
    }
}