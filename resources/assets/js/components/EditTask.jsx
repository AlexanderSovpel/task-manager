import React, { Component } from 'react';
import axios from 'axios';

import { apiPath } from '../helpers';

class EditTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      status: '',
      description: ''
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data) {
      if (this.props.data !== prevProps.data) {
        this.setState({...this.props.data});
      }
    }
  }

  componentDidMount() {
    $('#editTaskForm > [type=submit]').hide();
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });

    $('#editTaskForm > [type=submit]').show();
  }

  onSubmit(event) {
    event.preventDefault();

    axios.patch(apiPath(`tasks/${this.state.id}`), this.state)
      .then(response => {
        $('#editTaskForm > [type=submit]').hide();
        this.props.onTaskChanged(this.state);
      })
      .catch(error => console.error(error));
  }

  onDelete(event) {
    axios.delete(apiPath(`tasks/${this.state.id}`))
      .then(response => {
        $('#taskViewer').modal('hide');
        this.props.onTaskDeleted(this.state.id);
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <form
        id="editTaskForm"
        onChange={this.onInputChange}
        onSubmit={this.onSubmit}
      >
        <input type="hidden" name="id" defaultValue={this.state.id}/>

        <div className="form-group">
          <label htmlFor="editName" className="col-form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="editName"
            name="name"
            value={this.state.name}
          />
        </div>

        <div className="form-group">
          <label htmlFor="editStatus" className="col-form-label">Status</label>
          <select
            className="custom-select"
            id="editStatus"
            name="status"
            value={this.state.status}
          >
            <option value="todo">to do</option>
            <option value="doing">doing</option>
            <option value="done">done</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="editDescription" className="col-form-label">Description</label>
          <textarea
            className="form-control"
            id="editDescription"
            name="description"
            value={this.state.description || ''}
            placeholder="Add some description"
          >
          </textarea>
        </div>

        <button type="button" className="btn btn-outline-danger float-left" onClick={this.onDelete}>Delete</button>
        <button type="submit" className="btn btn-primary float-right">Save</button>
      </form>
    );
  }
}

export default EditTask;