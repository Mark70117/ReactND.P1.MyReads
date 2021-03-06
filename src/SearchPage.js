import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

// SearchPage component uses props:
// moveBookToShelf: callback function pass thru prop
//   on way to Book component
// loadSearchResults: callback function to contact API
//   update state with results
// searchResults: array keeping results of last search
// lastQuery: string keeping the last query
class SearchPage extends Component {
  static propTypes = {
    moveBookToShelf: PropTypes.func.isRequired,
    loadSearchResults: PropTypes.func.isRequired,
    searchResults: PropTypes.array.isRequired,
    lastQuery: PropTypes.string.isRequired,
  };

  onSearchChange = event => {
    const { loadSearchResults } = this.props;

    loadSearchResults(event.target.value);
  };

  render() {
    const { moveBookToShelf, searchResults, lastQuery } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.onSearchChange}
              value={lastQuery}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.map(book =>
              <li key={book.id}>
                <Book book={book} moveBookToShelf={moveBookToShelf} />
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
