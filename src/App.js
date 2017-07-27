import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './MainPage';
import SearchPage from './SearchPage';

import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [
      {
        previewLink:
          'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&source=gbs_api',
      },
      {
        previewLink:
          'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&source=gbs_api',
      },
      {
        previewLink:
          'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&source=gbs_api',
      },
      {
        previewLink:
          'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&source=gbs_api',
      },
      {
        previewLink:
          'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&source=gbs_api',
      },
      {
        previewLink:
          'http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&source=gbs_api',
      },
      {
        previewLink:
          'http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&source=gbs_api',
      },
    ],
  };

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => <MainPage books={this.state.books} />}
        />
        <Route path="/search" component={() => <SearchPage />} />
      </div>
    );
  }
}

export default BooksApp;
