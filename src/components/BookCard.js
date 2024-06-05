// src/components/BookCard.js
import React from 'react';
import './css/BookCard.css';

const BookCard = ({ book, addToBookshelf }) => {
  return (
    <div className="book-card">
      <h2>{book.title}</h2>
      <p>{book.author_name && book.author_name.join(', ')}</p>
      <button onClick={() => addToBookshelf(book)}>Add to Bookshelf</button>
    </div>
  );
};

export default BookCard;
