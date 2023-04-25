let myLibrary = []
const bookContainer = document.getElementById('displayBooks')
const addButton = document.getElementById('submit')
const form = document.getElementById('addBook')
let deleteButtons
let bookId = 0

function Book(author, title, pages, published, read, bookId) {
    this.author = author
    this.title = title
    this.pages = pages
    this.published = published
    this.read = read
    this.bookId = bookId
}
function removeBook() {
    let parent = this.parentElement
    parent.remove()
    myLibrary.splice(this.bookId, 1)
}
function clearScreen() {
    let books = document.getElementsByClassName('book')
    books = Array.from(books)
    books.forEach(element => {
        bookContainer.removeChild(element)
    });
}
function addBookToLibrary() {
    const newBook = new Book(form.author.value, form.title.value, form.pages.value, form.published.value, false, bookId)
    myLibrary.push(newBook)
    bookId++
}
function createBookDivs() {
    for (let i = 0; i < myLibrary.length; i++) {    
        let book = document.createElement('div')
        book.classList.add('book')
        book.setAttribute('id', `${i}`)
        bookContainer.appendChild(book)
    }
}
function displayInfo() {
    let books = document.getElementsByClassName('book')
    books = Array.from(books)
    for (let i = 0; i < books.length; i++) {
        let title = document.createElement('p')
        let author = document.createElement('p')
        let pages = document.createElement('p')
        let published = document.createElement('p')

        title.classList.add('info', 'title')
        author.classList.add('info', 'author')
        pages.classList.add('info', 'pages')
        published.classList.add('info', 'published')

        title.textContent = myLibrary[i].title
        author.textContent = 'By: ' + myLibrary[i].author
        pages.textContent = myLibrary[i].pages + ' pages'
        published.textContent = 'Published in: ' + myLibrary[i].published

        books[i].appendChild(title)
        books[i].appendChild(author)
        books[i].appendChild(pages)
        books[i].appendChild(published)
    }
}
function addButtons() {
    let books = document.getElementsByClassName('book')
    books = Array.from(books)
    for (let i = 0; i < books.length; i++) {
        let deleteBook = document.createElement('button')
        deleteBook.classList.add('delete')
        deleteBook.textContent = 'X'
        books[i].appendChild(deleteBook)
    }
    deleteButtons = document.getElementsByClassName('delete')
    deleteButtons = Array.from(deleteButtons)
    deleteButtons.forEach(e => {
        e.addEventListener('click', removeBook)
    });
}
function colorInputs() {
    let inputs = document.getElementsByClassName('input')
        inputs = Array.from(inputs)
        console.log(inputs)
        inputs.forEach(input => {
            if (input.checkValidity() == false) {
                input.classList.add('invalidInput')
            } else {
                input.classList.remove('invalidInput')
            }
        });
}
function displayBooks() {
    if (form.checkValidity()) {
        colorInputs()
        clearScreen()
        addBookToLibrary()
        createBookDivs()
        displayInfo()
        addButtons()
    } else {
        colorInputs()
    }
}

addButton.addEventListener('click', displayBooks)
