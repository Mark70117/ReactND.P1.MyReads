import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './MainPage';
import SearchPage from './SearchPage';

import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [
      {
        id: 'PGR2AwAAQBAJ',
        //imageLinks.thumbnail
        previewLink:
          'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&source=gbs_api',
        title: 'To Kill a Mockingbird',
        authors: ['Harper Lee'],
      },
      {
        id: 'yDtCuFHXbAYC',
        //imageLinks.thumbnail
        previewLink:
          'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&source=gbs_api',
        title: "Ender's Game",
        authors: ['Orson Scott Card'],
      },
      {
        id: 'uu1mC6zWNTwC',
        //imageLinks.thumbnail
        previewLink:
          'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&source=gbs_api',
        title: '1776',
        authors: ['David McCullough'],
      },
      {
        id: 'wrOQLV6xB-wC',
        //imageLinks.thumbnail
        previewLink:
          'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&source=gbs_api',
        title: "Harry Potter and the Sorcerer's Stone",
        authors: ['J.K. Rowling'],
      },
      {
        id: 'pD6arNyKyi8C',
        //imageLinks.thumbnail
        previewLink:
          'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&source=gbs_api',
        title: 'The Hobbit',
        authors: ['J.R.R. Tolkien'],
      },
      {
        id: '1q_xAwAAQBAJ',
        //imageLinks.thumbnail
        previewLink:
          'http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&source=gbs_api',
        title: "Oh, the Places You'll Go!",
        authors: ['Seuss'],
      },
      {
        id: '32haAAAAMAAJ',
        //imageLinks.thumbnail
        previewLink:
          'http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&source=gbs_api',
        title: 'The Adventures of Tom Sawyer',
        authors: ['>Mark Twain'],
      },
    ],
  };

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route exact path="/" render={() => <MainPage books={books} />} />
        <Route path="/search" component={() => <SearchPage />} />
      </div>
    );
  }
}

export default BooksApp;
