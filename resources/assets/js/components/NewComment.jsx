import React, { Component } from 'react';

import { apiPath } from '../helpers';

class NewComment extends Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const data = {
      task_id: this.props.data,
      text: this.state.text
    };

    axios.post(apiPath('comments'), data)
      .then(response => {
        $('#newCommentForm')[0].reset();
        // this.setState(null);
        this.props.onAddComment(response.data);
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <form
        id="newCommentForm"
        onSubmit={this.onSubmit}
      >
        <div className="form-group">
          <label htmlFor="newComment" className="col-form-label font-weight-bold">Add comment</label>
          <textarea
            className="form-control"
            id="newComment"
            name="text"
            placeholder="Add a comment..."
            onInput={this.onInputChange}
          >
          </textarea>
        </div>
        <button type="submit" className="btn btn-primary float-right">Save</button>
      </form>
    );
  }
}

export default NewComment;