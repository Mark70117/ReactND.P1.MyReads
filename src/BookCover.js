import React from 'react';

const BookCover = props => {
  const { imageLink_thumbnail } = props;
  const backgroundImage = `url("${imageLink_thumbnail}")`;

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
