// Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
// UI Constructor
function UI(){}
// UI Prototype Methods
UI.prototype.addBookToList = function(book){
    // Get list
    const list = document.getElementById('book-list');
    // Create tr
    const row = document.createElement('tr');
    // instert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">x</a></td>
    `;
    // Add to list
    list.appendChild(row);
}
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}
UI.prototype.showAlert = function(message, className){
    const div = document.createElement('div');
    // Add class
    div.className = "alert " + className;
    div.appendChild(document.createTextNode(message));
    // Insert Above Form in UI
    const container = document.querySelector('.container');
    const form = document.getElementById('book-form');
    container.insertBefore(div, form);
    // Remove alert
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 2000)
}
UI.prototype.deleteBook = function(target){
    if (target.className === 'delete'){
        target.parentElement.parentElement.remove();
        this.showAlert('Book removed.', 'success');
    }
}

// Event Listeners
document.querySelector('#book-form').addEventListener('submit', function(e){
    // Get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
    // Instantiate Book
    const book = new Book(title, author, isbn);
    // Instantiate UI
    const ui = new UI();
    // Validate
    if (title === '' || author === '' || isbn === ''){
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
        return;
    }

    // Add book to list
    ui.addBookToList(book);
    ui.showAlert('Book added!', 'success');
    //clear fields
    ui.clearFields();
    e.preventDefault();
})

document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    e.preventDefault();
});
