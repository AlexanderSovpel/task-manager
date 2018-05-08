import React, { Component } from 'react';
import axios from 'axios';

import { apiPath } from '../helpers';

import EditTask from './EditTask';
import NewComment from './NewComment';
import CommentList from './CommentList';

class TaskViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      status: '',
      description: '',
      comments: []
    }

    this.onAddComment = this.onAddComment.bind(this);
    this.onDeleteComment = this.onDeleteComment.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data) {
      if (this.props.data !== prevProps.data) {
        axios.get(apiPath(`tasks/${this.props.data}`))
        .then(response => {
          this.setState({...response.data});
        })
        .catch(error => console.error(error));
      }
    }
  }

  onAddComment(newComment) {
    this.setState(state => ({
      comments: [newComment, ...state.comments]
    }));

    this.props.onAddComment(this.state.id);
  }

  onDeleteComment(commentId) {
    this.setState(state => ({
      comments: state.comments.filter(comment => comment.id !== commentId)
    }));

    this.props.onDeleteComment(this.state.id);
  }

  render() {
    return (
      <div className="modal fade" id="taskViewer" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Task</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <EditTask
                data={this.state}
                onTaskChanged={this.props.onTaskChanged}
                onTaskDeleted={this.props.onTaskDeleted}
              />
            </div>

            <div className="modal-body border-top border-bottom">
              <NewComment
                data={this.state.id}
                onAddComment={this.onAddComment}
              />
            </div>

            <div className="modal-body">
              <h6 className="col-form-label font-weight-bold">Comments</h6>
              <CommentList
                data={this.state.comments}
                onDeleteComment={this.onDeleteComment}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskViewer;
