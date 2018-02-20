class Book{
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
    addBookToList(book){
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
    showAlert(message, className){
        const div = document.createElement('div');
        // Add class
        div.className = "alert " + className;
        div.appendChild(document.createTextNode(message));
        // Insert Above Form in UI
        const container = document.querySelector('.container');
        const form = document.getElementById('book-form');
        container.insertBefore(div, form);
        // Remove alert
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 2000)
    }
    deleteBook(target){
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
            this.showAlert('Book removed.', 'success');
        }
    }
    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Local Storage Class
class Store {
    static getBooks(){
        // Get books or empty array if theres no books
        if (localStorage.getItem('books') === null) return [];
        else return JSON.parse(localStorage.getItem('books'));
    }
    static displayBooks(){
        // Get books
        let books = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI();
            ui.addBookToList(book);
        });
    }
    static addBook(book){
        // Get books
        let books = Store.getBooks();
        // Add new book
        books.push(book)
        // Overwrite current books in local storage
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn){
        // Get books
        let books = Store.getBooks();
        books.forEach(function(book, index){
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', Store.displayBooks());

document.querySelector('#book-form').addEventListener('submit', function (e) {
    // Get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
    // Instantiate Book
    const book = new Book(title, author, isbn);
    // Instantiate UI
    const ui = new UI();
    // Validate
    if (title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    }else{
        // Add book to list
        ui.addBookToList(book);
        // Add book to local storage
        Store.addBook(book);
        ui.showAlert('Book added!', 'success');
        //clear fields
        ui.clearFields();
    }
    e.preventDefault();
})

document.getElementById('book-list').addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteBook(e.target);
    // Remove from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    e.preventDefault();
});

