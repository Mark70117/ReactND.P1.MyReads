import React from 'react';
import PropTypes from 'prop-types';
import BookCover from './BookCover';
import BookShelfChanger from './BookShelfChanger';

const Book = props => {
  const { book } = props;

  return (
    <div className="book">
      <div className="book-top">
        <BookCover imageLink_thumbnail={book.imageLinks.thumbnail} />
        <BookShelfChanger />
      </div>
      <div className="book-title">
        {book.title}
      </div>
      <div className="book-authors">
        {book.authors.join(', ')}
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
};

export default Book;
