import React, { Component } from 'react';
import axios from "axios";

import { apiPath } from '../helpers';

import TaskList from '../components/TaskList';
import TaskViewer from '../components/TaskViewer';
import NewTask from '../components/NewTask';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      current: undefined,
    };

    axios.get(apiPath('tasks'))
      .then(response => {
        this.setState({
          tasks: response.data
        });
      }).catch(error => console.log(error));

    this.onTaskSelect = this.onTaskSelect.bind(this);
    this.onTaskAdd = this.onTaskAdd.bind(this);
    this.onAddComment = this.onAddComment.bind(this);
    this.onDeleteComment = this.onDeleteComment.bind(this);
    this.onTaskChanged = this.onTaskChanged.bind(this);
    this.onTaskDeleted = this.onTaskDeleted.bind(this);
  }

  onTaskSelect(taskId) {
    this.setState({ current: taskId });
  }

  onTaskAdd(task) {
    this.setState(state => ({
      tasks: [...state.tasks, task]
    }));
  }

  onTaskChanged(changedTask) {
    this.setState(state => {
      return {
        tasks: state.tasks.map(task => {
          if (task.id === changedTask.id) {
            return {
              ...task,
              name: changedTask.name,
              status: changedTask.status
            };
          }

          return task;
        })
      };
    });
  }

  onTaskDeleted(taskId) {
    this.setState(state => {
      return {
        tasks: state.tasks.filter(task => task.id !== taskId)
      };
    });
  }

  onAddComment(taskId) {
    console.log(taskId)
    this.setState(state => {
      return {
        tasks: state.tasks.map(task => {
          if (task.id === taskId) {
            return {
              ...task,
              comments_count: ++task.comments_count,
            };
          }

          return task;
        })
      };
    }, () => console.log(this.state.tasks.find(task => task.id === taskId)));
  }

  onDeleteComment(taskId) {
    this.setState(state => {
      return {
        tasks: state.tasks.map(task => {
          if (task.id === taskId) {
            return {
              ...task,
              comments_count: task.comments_count -= 1,
            };
          }

          return task;
        })
      };
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <section className="col-sm">
            <header>
              <h1 className="text-center">To Do</h1>
            </header>
            <TaskList
              data={this.state.tasks.filter(task => task.status === 'todo')}
              onSelect={this.onTaskSelect}
            />
          </section>

          <section className="col-sm">
            <header>
              <h1 className="text-center">Doing</h1>
            </header>
            <TaskList
              data={this.state.tasks.filter(task => task.status === 'doing')}
              onSelect={this.onTaskSelect}
            />
          </section>

          <section className="col-sm">
            <header>
              <h1 className="text-center">Done</h1>
            </header>
            <TaskList
              data={this.state.tasks.filter(task => task.status === 'done')}
              onSelect={this.onTaskSelect}
            />
          </section>
        </div>

        <button
          type="button"
          className="btn btn-primary add-task"
          data-toggle="modal"
          data-target="#newTask"
        >
          New Task
        </button>

        <NewTask onSubmit={this.onTaskAdd}/>

        <TaskViewer
          data={this.state.current}
          onAddComment={this.onAddComment}
          onDeleteComment={this.onDeleteComment}
          onTaskChanged={this.onTaskChanged}
          onTaskDeleted={this.onTaskDeleted}
        />
      </div>
    );
  }
}

export default Index;