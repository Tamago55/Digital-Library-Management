window.onload = function() {
  // Check token from local storage
  // window.token = localStorage.getItem('token');

  // Initialize keyword
  window.currentKeyword = '';

  // Show/hide links based on token existence
  // document.getElementById('signup-link').style.display = token ? 'block' : 'none';
  // document.getElementById('verify-link').style.display = token ? 'block' : 'none';
  // document.getElementById('addbook-link').style.display = token ? 'block' : 'none';
  // document.getElementById('login-link').style.display = token ? 'none' : 'block';
  
  // document.getElementById('signup-link').style.display = 'block';
  // document.getElementById('verify-link').style.display = 'block';
  document.getElementById('addbook-link').style.display = 'block';
  // document.getElementById('login-link').style.display = 'block';
  // Initialize the table
  fetchAndDisplayBooks();

  // Add an event listener to the search button
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', function() {
    const keyword = document.getElementById('search-input').value;
    window.currentKeyword = keyword;  // Update currentKeyword
    fetchAndDisplayBooks(keyword);
  });

  // Add an event listener to the reset button
  const resetButton = document.getElementById('reset-button');
  resetButton.addEventListener('click', function() {
    window.currentKeyword = '';  // Reset currentKeyword
    fetchAndDisplayBooks();
    document.getElementById('search-input').value = '';
  });
};

document.getElementById('sort-selection').addEventListener('change', function() {
  const sortOrder = this.value;
  fetchAndDisplayBooks(window.currentKeyword, sortOrder);  // Pass currentKeyword for sorting
});

function fetchAndDisplayBooks(keyword = '', sortOrder = 'title-asc') {
  console.log('fetchAndDisplayBooks called with sortOrder:', sortOrder);
  //const API_URL = `https://zns6q7edk7.execute-api.us-east-1.amazonaws.com/bookStage/book-list-add/book-search`; 
  const API_URL = 'https://5ggvhe17m2.execute-api.us-east-1.amazonaws.com/bookstage/booklist_search';
  const bodyContent = {
    keyword: keyword
  };
  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(bodyContent)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Received data:', data);
    console.log(data); 
    data = sortData(data, sortOrder);
    console.log('Sorted data:', data);  
    const tableBody = document.getElementById('book-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    if (data && Array.isArray(data)) {
      data.forEach((item, index) => {
        const newRow = tableBody.insertRow();

        newRow.insertCell(0).innerText = index + 1;

        newRow.insertCell(1).innerText = item.Book_id;

        const bookImage = new Image();
        bookImage.src = `./images/${item.Book_id}.png`;
        bookImage.onerror = function() {
            bookImage.src = './images/no_data.png';
        };
        bookImage.style.width = '100px';
        bookImage.style.height = '140px';
        newRow.insertCell(2).appendChild(bookImage);

        newRow.insertCell(3).innerText = item.Title;
        newRow.insertCell(4).innerText = item.Author;
        newRow.insertCell(5).innerText = item.Publication_date;
        newRow.insertCell(6).innerText = item.Language;

        const pdfLinkCell = newRow.insertCell(7); 
        const pdfLink = document.createElement('a');  
        pdfLink.href = `./books/${item.Book_id}.pdf`;  
        pdfLink.target = "_blank";  // Open in a new tab
        pdfLink.innerText = "Link";  

        // Check if the PDF exists
        fetch(pdfLink.href)
          .then(response => {
            if (response.status === 404) {
              pdfLinkCell.innerText = 'No data';  // No PDF available
            } else {
              pdfLinkCell.appendChild(pdfLink);  // PDF available, append the link
            }
          });

        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.dataset.bookid = item.Book_id;
        editBtn.className = 'edit-button';
        editBtn.addEventListener('click', () => {
          const bookId = editBtn.dataset.bookid;
          window.location.href = `editbook.html?bookId=${bookId}`;
        });
        // if (token) {
          newRow.insertCell(8).appendChild(editBtn);
        // }

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.addEventListener('click', () => deleteBook(item.Book_id));
        // if (token) {
          newRow.insertCell(9).appendChild(deleteBtn);
        // }
      });
    } else {
      console.log('No items to display');
    }
  })
  .catch(error => console.error('Error:', error));
}

function sortData(data, sortOrder) {
  console.log('sortData called with sortOrder:', sortOrder);
  let sortedData = [...data];

  const [sortField, sortDirection] = sortOrder.split('-');
  const correctedSortField = sortField.charAt(0).toUpperCase() + sortField.slice(1);

  sortedData.sort((a, b) => {
    if (a[correctedSortField] < b[correctedSortField]) {
      return sortDirection === 'asc' ? -1 : 1;
    } else if (a[correctedSortField] > b[correctedSortField]) {
      return sortDirection === 'asc' ? 1 : -1;
    } else {
      return 0;
    }
  });

  return sortedData;
}

function deleteBook(bookId) {
  if (confirm('Are you sure you want to delete this book?')) {
    const API_DELETE_URL = 'https://5ggvhe17m2.execute-api.us-east-1.amazonaws.com/bookstage/booklist'; 
    const bodyData = {
      Book_id: bookId,
    };
    console.log('Deleting book with data:', bodyData);
    fetch(API_DELETE_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Book_id: bookId,
      }),
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(`Error deleting book: ${text}`);
        });
      }
      return response.json();
    })
    .then(data => {
      if (data.result === 'success') {
        // alert('Book deleted successfully');
        location.reload();
      } else {
        alert('Error deleting book');
      }
    })
    .catch(error => console.error('Detailed Error:', error));
  }
}
