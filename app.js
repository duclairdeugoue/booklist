// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
// UI Constructor
function UI() { }

// Add Book to list Prototype
UI.prototype.addBookToList = function (book) {
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

// Clear fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
    console.info('Fields has been cleared');
}

// Show Alert
UI.prototype.showAlert = function (msg, className) {
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

// Delete book
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
        console.info('Book has been deleted');

    }
}



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

    // Show alert 
    ui.showAlert('Book remove suceessfully', 'success');

    e.preventDefault();
});
