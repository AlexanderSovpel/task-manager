import React, { Component } from 'react';

import Task from './Task';

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskList: props.data
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.props.data) !== JSON.stringify(prevProps.data)) {
      this.setState({ taskList: this.props.data });
    }
  }

  render() {
    return (
      <section className="list-group task-list">
      {
        this.state.taskList.map((task, index) => (
          <Task
            key={index}
            data={task}
            onSelect={this.props.onSelect}
          />
        ))
      }
      </section>
    );
  }
}

export default TaskList;