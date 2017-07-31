import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

// MainPage component uses props:
// books: dictionary of books on shelves, book.id is key
// moveBookToShelf: callback function pass thru prop
//   on way to Book component
// bookSort: callback function pass thru prop
//   on way to BookShelf component
class MainPage extends Component {
  gFilter = (str, total, num) => (total, num) =>
    this.props.books[num].shelf === str
      ? { ...total, [num]: { ...this.props.books[num] } }
      : total;

  readFilter = this.gFilter('read');
  wantToReadFilter = this.gFilter('wantToRead');
  currentlyReadingFilter = this.gFilter('currentlyReading');

  render() {
    const { books, bookSort, moveBookToShelf } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title="Currently Reading"
              books={Object.keys(books).reduce(this.currentlyReadingFilter, {})}
              bookSort={bookSort}
              moveBookToShelf={moveBookToShelf}
            />
            <BookShelf
              title="Want to Read"
              books={Object.keys(books).reduce(this.wantToReadFilter, {})}
              bookSort={bookSort}
              moveBookToShelf={moveBookToShelf}
            />
            <BookShelf
              title="Read"
              books={Object.keys(books).reduce(this.readFilter, {})}
              bookSort={bookSort}
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
  books: PropTypes.object.isRequired,
  moveBookToShelf: PropTypes.func.isRequired,
  bookSort: PropTypes.func.isRequired,
};
export default MainPage;
