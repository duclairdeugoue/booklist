class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


class UI {
    constructor() { }

    // Add Book
    addBookToList(book) {
        const list = document.getElementById('book-list');

        // Create tr element: row
        const tr = document.createElement('tr');

        // Insert columns
        tr.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href= "#" class="delete">X</a></td>
    `;

        list.appendChild(tr);
        console.info('Book has been added');
    }

    // Clear field
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
        console.info('Fields has been cleared');
    }

    // Show alert
    showAlert(msg, className) {
        // Create Div
        const div = document.createElement('div');
        // Add class name
        div.className = `alert ${className}`;
        // Add node
        div.appendChild(document.createTextNode(msg));
        // Append to the parent in the DOM
        // Get parent
        const container = document.querySelector('.container');
        const form = document.getElementById('book-form');

        container.insertBefore(div, form);

        // Time out after 3s
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    // Delete Book
    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
            console.info('Book has been deleted');
        }
    }

}


// Local Storage class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function (book) {

            const ui = new UI();

            ui.addBookToList(book);

        });
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static deleteBook(isbn) {
        const books = Store.getBooks();

        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
        console.info('Book deleted from Local Storage');

    }

}

// DOM Load events
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function (e) {

    // Get UI Form Values
    const title = document.getElementById('title').value,
        author = document.querySelector('#author').value,
        isbn = document.getElementById('isbn').value;

    // Instantiate book 
    const book = new Book(title, author, isbn);
    // console.log(book);

    // Instantiate UI
    const ui = new UI();

    // Validate UI input
    if (title === '' || author === '' || isbn === '') {

        // Show alert failure
        ui.showAlert('Please fill in the fields', 'error');
    } else {
        // Add book to UI
        ui.addBookToList(book);
        // Add to local storage
        Store.addBook(book);
        // Show alert success
        ui.showAlert('Book Added successfully', 'success');

        // Clear field
        ui.clearFields();
    }

    e.preventDefault();
});


// Event Listener for add book
document.getElementById('book-list').addEventListener('click', function (e) {

    // Instantiate UI
    const ui = new UI();

    // Delete book from UI
    ui.deleteBook(e.target);

    // Remove Book form LS
    Store.deleteBook(e.target.parentElement.previousElementSibling.textContent);

    // Show alert 
    ui.showAlert('Book remove suceessfully', 'success');

    e.preventDefault();
}); 