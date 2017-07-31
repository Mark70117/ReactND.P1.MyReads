import React, { Component } from 'react';
import PropTypes from 'prop-types';

// BookShelfChanger component uses props:
// shelf: string of book current shelf
// moveToShelf: callback function used
//   when 'select' value changes
class BookShelfChanger extends Component {
  static propTypes = {
    shelf: PropTypes.string.isRequired,
    moveToShelf: PropTypes.func.isRequired,
  };

  handleChange = event => {
    const { moveToShelf } = this.props;

    moveToShelf(event.target.value);
  };

  render() {
    const { shelf } = this.props;

    return (
      <div className="book-shelf-changer">
        <select value={shelf} onChange={this.handleChange}>
          <option value="none" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default BookShelfChanger;
