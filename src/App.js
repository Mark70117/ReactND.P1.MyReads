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

  moveBookToShelf = (changingBook, shelf) => {
    this.setState(prevState => ({
      books: prevState.books.map(
        aBook =>
          aBook.id === changingBook.id ? { ...changingBook, shelf } : aBook
      ),
    }));
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
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
