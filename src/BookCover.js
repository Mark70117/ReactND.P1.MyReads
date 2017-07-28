import React from 'react';
import PropTypes from 'prop-types';

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

BookCover.propTypes = {
  imageLink_thumbnail: PropTypes.string.isRequired,
};

export default BookCover;
