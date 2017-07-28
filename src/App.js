import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './MainPage';
import SearchPage from './SearchPage';
import * as BooksAPI from './BooksAPI';

import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
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
    }));
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
        console.log('response:');
        console.log(response);
        BooksAPI.getAll().then(books => {
          this.setState({
            books: books.sort(this.bookSort),
          });
        });
      })
      .catch(e => {
        console.log('error:');
        console.log(e);
        BooksAPI.getAll().then(books => {
          this.setState({
            books: books.sort(this.bookSort),
          });
        });
      });
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books: books.sort(this.bookSort),
      });
    });
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
        <Route path="/search" component={() => <SearchPage />} />
      </div>
    );
  }
}

export default BooksApp;
