import React, { Component } from 'react';

import { apiPath } from '../helpers';

class NewTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      status: 'todo',
      description: ''
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    axios.post(apiPath('tasks'), {
      name: this.state.name,
      status: this.state.status,
      description: this.state.description
    }).then(response => {
      this.props.onSubmit(response.data);
    })
      .catch(error => console.error(error));

    $('#newTask').modal('hide');
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="modal fade" id="newTask" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">New Task</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form
                onChange={this.onInputChange}
                onSubmit={this.onSubmit}
                id="newTaskForm"
              >
                <div className="form-group">
                  <label htmlFor="newName" className="col-form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="newName"
                    name="name"
                    placeholder="New task name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="newStatus" className="col-form-label">Status</label>
                  <select
                    className="custom-select"
                    id="newStatus"
                    name="status"
                    defaultValue="todo"
                  >
                    <option value="todo">to do</option>
                    <option value="doing">doing</option>
                    <option value="done">done</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="newDescription" className="col-form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="newDescription"
                    name="description"
                    placeholder="Add some description"
                  >
                  </textarea>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary" form="newTaskForm">Save</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewTask;
