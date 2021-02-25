// Define UI variables
const form = document.querySelector('#book-form');
const bookList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-books');
const filter = document.querySelector('#filter');
const bookInput = document.querySelector('#book');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getBooks);
  // Add book event
  form.addEventListener('submit', addBook);
  // Remove book event
  bookList.addEventListener('click', removeBook);
  // Clear books
  clearButton.addEventListener('click', clearBooks);
  // Filter books
  filter.addEventListener('keyup', filterBooks);
}

// Get books from local storage
function getBooks() {
  let books;
  if(localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  books.forEach(function(book) {
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(book));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to the li
    li.appendChild(link);
    bookList.appendChild(li);
  });
}

// Add Book
function addBook(e) {
  if(bookInput.value === '') {
    alert('Add a book');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(bookInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append link to the li
  li.appendChild(link);

  // Append li to ul
  bookList.appendChild(li);

  // Store in local storage
  storeBook(bookInput.value);

  // Clear Input
  bookInput.value = '';
  
  e.preventDefault();
}

// Store Book
function storeBook(book) {
  let books;
  if(localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  books.push(book);

  localStorage.setItem('books', JSON.stringify(books));
}

// Remove book
function removeBook(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure you want to remove this book?')) {
      e.target.parentElement.parentElement.remove();
      // Remove from local storage
      removeBookFromStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeBookFromStorage(bookItem) {
  let books;
  if(localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  books.forEach(function(book, index){
    if(bookItem.textContent === book) {
      books.splice(index, 1);
    }
  });

  localStorage.setItem('books', JSON.stringify(books));
}

function clearBooks() {
  while(bookList.firstChild) {
    bookList.removeChild(bookList.firstChild);
  }

  clearBooksFromStorage();
}

function clearBooksFromStorage() {
  localStorage.clear();
}

function filterBooks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function(book) {
      const item = book.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1) {
        book.style.display = 'block';
      } else {
        book.style.display = 'none';
      }
    });
}