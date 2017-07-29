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
    const idx = this.state.books[book.id];
    if (idx) {
      return { ...book, shelf: this.state.books[idx].shelf };
    } else {
      return { ...book, shelf: 'none' };
    }
  };

  loadSearchResults = query => {
    this.setState({ lastQuery: query });
    BooksAPI.search(query, 5).then(result => {
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

  localMoveBookToShelf = (changingBook, shelf) => {
    this.setState(prevState => ({
      books: prevState.books
        .map(
          aBook =>
            aBook.id === changingBook.id ? { ...changingBook, shelf } : aBook
        )
        .sort(this.bookSort),
      searchResults: prevState.searchResults
        .map(
          aBook =>
            aBook.id === changingBook.id ? { ...changingBook, shelf } : aBook
        )
        .sort(this.bookSort),
    }));
  };
  makeIdKey = (total, element) => {
    return element.id ? { ...total, [element.id]: element } : total;
  };

  getAllToState = () => {
    BooksAPI.getAll().then(books => {
      const booksDict = books.reduce(this.makeIdKey, {});
      console.log('[getAllToState');
      console.log(booksDict);
      console.log(']getAllToState');
      this.setState({
        books: booksDict,
      });
    });
  };

  // decided agains doing a lot of computation and just call getAll to keep in sync.
  //   local change will be quick for user
  //   getAll should change nothing, React will be smart with the virtualDOM
  //     so user will not notice all the network calls
  //   what if getAll fails?
  moveBookToShelf = (changingBook, shelf) => {
    this.localMoveBookToShelf(changingBook, shelf);

    BooksAPI.update(changingBook, shelf)
      .then(response => {
        this.getAllToState();
      })
      .catch(e => {
        console.log('error:');
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
            <MainPage books={books} moveBookToShelf={this.moveBookToShelf} />}
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
