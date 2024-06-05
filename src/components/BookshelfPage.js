import React, { useEffect, useState } from 'react';

const BookshelfPage = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  return (
    <div>
      <h1>My Bookshelf</h1>
      <div className="bookshelf">
        {bookshelf.map((book, index) => (
          <div key={index} className="book-card">
            <h2>{book.title}</h2>
            <p>{book.author_name && book.author_name.join(', ')}</p>
          </div>
        ))}
      </div>
      <button onClick={() => window.location.href = '/'}>Back to Search</button>
    </div>
  );
};

export default BookshelfPage;
