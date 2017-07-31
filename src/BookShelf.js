import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

// BookShelf component uses props:
// title: string with title for shelf
// books: dictionary of books on shelves, book.id is key
// bookSort: callback function to maintain one order of books
// moveBookToShelf: callback function pass thru prop
//   on way to Book component
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
  bookSort: PropTypes.func.isRequired,
  moveBookToShelf: PropTypes.func.isRequired,
};

export default BookShelf;
