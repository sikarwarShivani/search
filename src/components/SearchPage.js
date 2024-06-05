// src/components/SearchPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import Loader from './Loader';
import './css/SearchPage.css';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch initial books
    const fetchInitialBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://openlibrary.org/search.json?q=books&limit=10&page=1`);
        setResults(response.data.docs);
      } catch (err) {
        setError('Failed to fetch initial books.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialBooks();
  }, []);

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value) {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://openlibrary.org/search.json?q=${e.target.value}&limit=10&page=1`);
        setResults(response.data.docs);
      } catch (err) {
        setError('Failed to fetch search results.');
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  const addToBookshelf = (book) => {
    const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    localStorage.setItem('bookshelf', JSON.stringify([...bookshelf, book]));
  };

  return (
    <div className="search-page">
      <h1>Search by Book Name</h1>
      <input 
        type="text" 
        placeholder="Search for a book" 
        value={query} 
        onChange={handleSearch} 
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="results">
          {results.map((book, index) => (
            <BookCard key={index} book={book} addToBookshelf={addToBookshelf} />
          ))}
        </div>
      )}
      <button onClick={() => window.location.href = '/bookshelf'}>Go to My Bookshelf</button>
    </div>
  );
};

export default SearchPage;
