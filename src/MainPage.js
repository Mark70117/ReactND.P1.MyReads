import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

const wantToReadFilter = (element, index, array) => {
  return element.shelf && element.shelf === 'wantToRead';
};

const currentlyReadingFilter = (element, index, array) => {
  return element.shelf && element.shelf === 'currentlyReading';
};

const readFilter = (element, index, array) => {
  return element.shelf && element.shelf === 'read';
};

class MainPage extends Component {
  render() {
    const { books, moveBookToShelf } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title="Currently Reading"
              books={books.filter(currentlyReadingFilter)}
              moveBookToShelf={moveBookToShelf}
            />
            <BookShelf
              title="Want to Read"
              books={books.filter(wantToReadFilter)}
              moveBookToShelf={moveBookToShelf}
            />
            <BookShelf
              title="Read"
              books={books.filter(readFilter)}
              moveBookToShelf={moveBookToShelf}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  books: PropTypes.array.isRequired,
  moveBookToShelf: PropTypes.func.isRequired,
};
export default MainPage;
