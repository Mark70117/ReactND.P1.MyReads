import React from 'react';

const BookCover = props => {
  const { previewLink } = props;

  const backgroundImage = `url("${previewLink}&img=1&zoom=1")`;
  return (
    <div
      className="book-cover"
      style={{
        width: 128,
        height: 188,
        backgroundImage: backgroundImage,
      }}
    />
  );
};

export default BookCover;
