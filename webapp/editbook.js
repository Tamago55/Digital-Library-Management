// Fetch existing data of the book from the API
function fetchExistingBookData(bookId) {
  //const API_URL = `https://zns6q7edk7.execute-api.us-east-1.amazonaws.com/bookStage/book-list-add/book-id?bookId=${bookId}`;
  const API_URL = `https://5ggvhe17m2.execute-api.us-east-1.amazonaws.com/bookStage/booklist/book-id?bookId=${bookId}`;
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      console.log(data);  // Log the response data
      // Filter items by bookId
      let correctItem = data.Items.find(item => item.Book_id.S === bookId);
      if (correctItem) {
        // Populate form with existing data
        document.getElementById('title').value = correctItem.Title.S;
        document.getElementById('author').value = correctItem.Author.S;
        document.getElementById('date').value = correctItem.Publication_date.S;
        document.getElementById('booklanguage').value = correctItem.Language.S;
      } else {
        console.error('No item data available from the API response');
      }
    })
    .catch(error => console.error('Error:', error));
}

window.addEventListener('DOMContentLoaded', (event) => {
  // Get Book ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get('bookId');
  fetchExistingBookData(bookId);  // Fetch existing data and populate the form
});

document.getElementById('editBookForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get Book ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get('bookId');

  const title = document.getElementById('title').value;
  console.log(`Title: ${title}`);
  const author = document.getElementById('author').value;
  const date = document.getElementById('date').value;
  const language = document.getElementById('booklanguage').value;

  const API_URL = 'https://5ggvhe17m2.execute-api.us-east-1.amazonaws.com/bookstage/booklist';
  const bodyData = {
    newTitle: title,
    newAuthor: author,
    newDate: date,
    newLanguage: language,
    Book_id: bookId
  };

  console.log(bodyData);

  fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(data => {
    alert('Book updated successfully!');
    window.location.href = 'index.html';
  })
  .catch(error => {
    alert('Error while updating book.');
    console.error('Error:', error);
  });
});
