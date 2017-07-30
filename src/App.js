import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './MainPage';
import SearchPage from './SearchPage';
import * as BooksAPI from './BooksAPI';

import './App.css';

class BooksApp extends React.Component {
  state = {
    books: {},
    searchResults: [],
    lastQuery: '',
  };

  // BooksAPI returns books with shelf values that do not
  //  match GetAll.  Some books in "My"Reads 'Currently Reading'
  //  return as none, other show up with a value of shelf set
  //  but should be 'none'
  improveResult = book => {
    const b = this.state.books[book.id];
    const idx = b ? b.id : false;
    if (idx) {
      return { ...book, shelf: this.state.books[idx].shelf };
    } else {
      return { ...book, shelf: 'none' };
    }
  };

  loadSearchResults = query => {
    this.setState({ lastQuery: query });
    BooksAPI.search(query, 3).then(result => {
      if (result && !result.error) {
        let betterResults = result.map(this.improveResult);
        this.setState({
          searchResults: betterResults.sort(this.bookSort),
        });
      } else {
        this.setState({ searchResults: [], lastQuery: query });
      }
    });
  };

  bookSort = (a, b) => a.title.localeCompare(b.title);

  makeIdKey = (total, element) => {
    return element.id ? { ...total, [element.id]: element } : total;
  };

  localMoveBookToShelf = (changingBook, shelf) => {
    const moveBookClosure = id => {
      const f_id =
        id === changingBook.id
          ? { ...this.state.books[changingBook.id], shelf }
          : this.state.books[id];
      return f_id;
    };
    this.setState(prevState => ({
      books: Object.keys(prevState.books)
        .map(moveBookClosure)
        .reduce(this.makeIdKey, {}),
      searchResults: prevState.searchResults
        .map(
          aBook =>
            aBook.id === changingBook.id ? { ...changingBook, shelf } : aBook
        )
        .sort(this.bookSort),
    }));
  };

  getAllToState = () => {
    BooksAPI.getAll().then(books => {
      const booksDict = books.reduce(this.makeIdKey, {});
      this.setState({
        books: booksDict,
      });
    });
  };

  moveBookToShelf = (changingBook, shelf) => {
    this.localMoveBookToShelf(changingBook, shelf);

    const updateConsistent = (bookArray, shelf) => {
      return bookArray.reduce(
        (pred, bookId) => pred && this.state.books[bookId].shelf === shelf,
        true
      );
    };

    const updateResponseConsistent = response =>
      updateConsistent(response.currentlyReading, 'currentlyReading') &&
      updateConsistent(response.wantToRead, 'wantToRead') &&
      updateConsistent(response.read, 'read');

    BooksAPI.update(changingBook, shelf)
      .then(response => {
        if (!updateResponseConsistent(response)) {
          console.log('State Out of Sync!');
          this.getAllToState();
        }
      })
      .catch(e => {
        console.log('moveBookToShelf update error:');
        console.log(e);
        this.getAllToState();
      });
  };

  componentDidMount() {
    this.getAllToState();
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() =>
            <MainPage
              books={books}
              bookSort={this.bookSort}
              moveBookToShelf={this.moveBookToShelf}
            />}
        />
        <Route
          path="/search"
          render={() =>
            <SearchPage
              moveBookToShelf={this.moveBookToShelf}
              loadSearchResults={this.loadSearchResults}
              searchResults={this.state.searchResults}
              lastQuery={this.state.lastQuery}
            />}
        />
      </div>
    );
  }
}

export default BooksApp;
