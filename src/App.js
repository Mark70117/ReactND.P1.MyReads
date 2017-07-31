import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './MainPage';
import SearchPage from './SearchPage';
import * as BooksAPI from './BooksAPI';

import './App.css';

class BooksApp extends React.Component {
  // all state modification (via setState)
  // are done by method in this class, the
  // help method is passes as a prop to other
  // components
  state = {
    books: {}, // dictionary indexed by book.id
    searchResults: [], // search results from last query
    lastQuery: '', // saved last query to re-enter in form
  };

  // BooksAPI returns books with shelf values that do not
  //  match GetAll.  Some books in "My"Reads 'Currently Reading'
  //  return as none, other show up with a value of shelf set
  //  but should be 'none'
  //
  //  function for use by .map
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
    BooksAPI.search(query, 20).then(result => {
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

  // Sorting function to sort book alphabetically to
  // improve the UX by having books always appear in
  // a fixed order
  //
  // for use by .sort
  bookSort = (a, b) => a.title.localeCompare(b.title);

  // utiliity function used to translate books array to
  // a dictionary with book.id as the key
  //
  // for use by .reduce
  makeIdKey = (total, element) => {
    return element.id ? { ...total, [element.id]: element } : total;
  };

  // move Book to Shelf on the client side, better UX
  // for user not to have to wait for round trip to
  // server
  localMoveBookToShelf = (changingBook, shelf) => {
    // util function to bind changingBook and shelf
    // and return a function that can be used by .map
    // returned function maps id to book object with
    // matching id to desired shelf
    const moveBookClosure = id => {
      const f_id =
        id === changingBook.id
          ? { ...this.state.books[changingBook.id], shelf }
          : this.state.books[id];
      return f_id;
    };

    // use setState to update this client state to reflect
    // which shelf a book is located on.  May for a short
    // time be differnet than server while messages are in
    // transit
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

  // method to map API return book array to dictionary with
  // book.id as key, then set this client state
  // used when component is mounted, or when evidence that
  // this local client state is out of sync with server
  getAllToState = () => {
    BooksAPI.getAll().then(books => {
      const booksDict = books.reduce(this.makeIdKey, {});
      this.setState({
        books: booksDict,
      });
    });
  };

  // move Boot to Shelf, first in local client state
  // then send knowledge to server
  // if server API response is error or NOT consistent with
  // local state, resync with API, via getAllToState
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

  // when component mounts, get initial state.
  componentDidMount() {
    this.getAllToState();
  }

  // <BrowserRouter> in index.js allow us to use Route tag
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
