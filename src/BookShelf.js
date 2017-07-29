import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookShelf = props => {
  const { title, books, moveBookToShelf } = props;
  console.log('[BookShelf');
  console.log(books);
  console.log(']BookShelf');
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">
        {title}
      </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {Object.keys(books).map(id =>
            <li key={id}>
              <Book book={books[id]} moveBookToShelf={moveBookToShelf} />
            </li>
          )}
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.object.isRequired,
  moveBookToShelf: PropTypes.func.isRequired,
};

export default BookShelf;
