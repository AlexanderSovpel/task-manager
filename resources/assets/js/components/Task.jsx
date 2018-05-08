import React, { Component} from 'react';

class Task extends Component {
  constructor(props) {
    super(props);

    this.onTaskClick = this.onTaskClick.bind(this);
  }

  onTaskClick(event) {
    this.props.onSelect(this.props.data.id);
  }

  render() {
    return (
      <article
        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        data-toggle="modal"
        data-target="#taskViewer"
        data-task-id={this.props.data.id}
        onClick={this.onTaskClick}
      >
        {this.props.data.name}
        <span className="badge badge-pill badge-primary">
          {this.props.data.comments_count}
        </span>
      </article>
    );
  }
}

export default Task;