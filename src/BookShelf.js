import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookShelf = props => {
  const { title, books, bookSort, moveBookToShelf } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">
        {title}
      </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {Object.values(books).sort(bookSort).map(book =>
            <li key={book.id}>
              <Book book={book} moveBookToShelf={moveBookToShelf} />
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
  bookSort: PropTypes.func.isRequired,
};

export default BookShelf;
