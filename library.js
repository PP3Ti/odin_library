let myLibrary = []
const bookContainer = document.getElementById('displayBooks')
const addButton = document.getElementById('submit')
const form = document.getElementById('addBook')
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

        if (myLibrary[i].read) {
            books[i].classList.add('greenBorder')
        }
    }
}
function toggleColor () {
    let parentBook = this.parentElement.parentElement.parentElement
    let index = parentBook.id

    if (this.checked) {
        parentBook.classList.add('greenBorder')
        myLibrary[index].read = true
    } else {
        parentBook.classList.remove('greenBorder')
        myLibrary[index].read = false
    }
}
function addReadToggle() {
    let books = document.getElementsByClassName('book')
    books = Array.from(books)

    for (let i = 0; i < books.length; i++) {
        let toggleDiv = document.createElement('div')
        let switchLabel = document.createElement('label')
        let checkbox = document.createElement('input')
        let slider = document.createElement('span')

        slider.classList.add('slider')
        toggleDiv.classList.add('toggle')
        switchLabel.classList.add('switch')
        checkbox.classList.add('checkbox')
        checkbox.type = 'checkbox'
        checkbox.setAttribute('id', `checkbox${i}`)

        switchLabel.appendChild(checkbox)
        switchLabel.appendChild(slider)
        toggleDiv.appendChild(switchLabel)
        books[i].appendChild(toggleDiv)
    }
    let readToggles = document.getElementsByClassName('checkbox')
    readToggles = Array.from(readToggles)
    readToggles.forEach(e => {
        e.addEventListener('change', toggleColor)
    });
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
    let deleteButtons = document.getElementsByClassName('delete')
    deleteButtons = Array.from(deleteButtons)
    deleteButtons.forEach(e => {
        e.addEventListener('click', removeBook)
    });
}
function colorInputs() {
    let inputs = document.getElementsByClassName('input')
        inputs = Array.from(inputs)
        inputs.forEach(input => {
            if (input.checkValidity() == false) {
                input.classList.add('invalidInput')
            } else {
                input.classList.remove('invalidInput')
            }
        });
}
function checkSlider() {
    let books = document.getElementsByClassName('book')
    books = Array.from(books)

    for (i = 0; i < books.length; i++) {
        if (myLibrary[i].read) {
            books[i].querySelector('.toggle > .switch > .checkbox').checked = true
        }
    }
}
function displayBooks() {
    if (form.checkValidity()) {
        colorInputs()
        clearScreen()
        addBookToLibrary()
        createBookDivs()
        displayInfo()
        addButtons()
        addReadToggle()
        checkSlider()
    } else {
        colorInputs()
    }
}

addButton.addEventListener('click', displayBooks)
