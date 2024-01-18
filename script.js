let newBookBtn = document.querySelector("#new-book-btn");
let newBookForm = document.querySelector("#new-book-form");
let addedBookBtn = document.querySelector("#addedBook");

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

toggleRead = (index) => {
  myLibrary[index].toggleRead();
  render();
};

addBookToLibrary = () => {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read").checked;

  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  render();
};

render = () => {
  let libraryElement = document.querySelector("#library");
  libraryElement.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let bookElement = document.createElement("div");
    bookElement.setAttribute("class", "book-card");
    bookElement.innerHTML = `
    <div class="card-header">
      <h3 class="title">${book.title}</h3>
      <h5 class="author">${book.author}</h5>
    </div>
    <div class="card-body">
      <p>${book.pages} pages</p>
      <p class="read-status">${book.read ? "Read" : "Not Read Yet"}</p>
      <button class="remove-btn" onclick="removeBook(${i})">Remove</button>
      <button class="toggle-read-btn" onclick="toggleRead(${i})">Toggle Read</button>
    </div>
    `;
    libraryElement.appendChild(bookElement);
  }
};

removeBook = (index) => {
  myLibrary.splice(index, 1);
  render();
};

newBookBtn.addEventListener("click", () => {
  newBookForm.style.display = "block";
});

addedBookBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addBookToLibrary();
  newBookForm.style.display = "none";

  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
});
