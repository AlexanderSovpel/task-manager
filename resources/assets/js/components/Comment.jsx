import React, { Component } from 'react';
import axios from 'axios';
import { apiPath } from '../helpers';

const formatter = new Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit'
});

class Comment extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(event) {
    axios.delete(apiPath(`comments/${this.props.data.id}`))
      .then(response => {
        this.props.onDelete(this.props.data.id);
      })
      .catch(error => console.error(error));
  }

  render() {
    const date = new Date(this.props.data.created_at);

    return (
      <article className="list-group-item comment">
        <button
          type="button"
          className="close"
          aria-label="Delete"
          onClick={this.onDelete}
        >
          <span aria-hidden="true">&times;</span>
        </button>
  
        <p>{this.props.data.text}</p>
  
        <footer className="font-weight-light text-muted text-right">
          {formatter.format(date)}
        </footer>
      </article>
    );
  }
}

export default Comment;