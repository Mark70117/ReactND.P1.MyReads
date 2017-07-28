import React from 'react';
import PropTypes from 'prop-types';
import BookCover from './BookCover';
import BookShelfChanger from './BookShelfChanger';

const Book = props => {
  const { book, moveBookToShelf } = props;
  const imageLink_thumbnail =
    book.imageLinks && book.imageLinks.thumbnail
      ? book.imageLinks.thumbnail
      : '';
  return (
    <div className="book">
      <div className="book-top">
        <BookCover imageLink_thumbnail={imageLink_thumbnail} />
        <BookShelfChanger
          shelf={book.shelf}
          moveToShelf={shelf => moveBookToShelf(book, shelf)}
        />
      </div>
      <div className="book-title">
        {book.title}
      </div>
      {book.authors
        ? <div className="book-authors">
            {book.authors.join(', ')}
          </div>
        : <p />}
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  moveBookToShelf: PropTypes.func.isRequired,
};

export default Book;
