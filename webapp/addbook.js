document.getElementById('addBookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var title = document.getElementById('title').value;
    var author = document.getElementById('author').value;
    var date = document.getElementById('date').value;
    var booklanguage = document.getElementById('booklanguage').value;
    var data = {
        title: title,
        author: author,
        date: date,
        booklanguage: booklanguage
    };
    fetch('https://5ggvhe17m2.execute-api.us-east-1.amazonaws.com/bookstage/booklist', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())  // Parse response as JSON
    .then(responseData => {
        if (responseData.result === 'success') {
            alert('Book added successfully!');
            location.reload();
        } else {
            alert('Failed to add book.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
