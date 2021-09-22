/* eslint-disable class-methods-use-this, react/no-find-dom-node */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Tasks from '../../api/tasks/tasks';
import Task from '../Task.jsx';

// App component - represents the whole app
class CrawlerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  handleClick() {
    console.log('handleClick Search');
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('tasks.insert', text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  crawlerAction() {
    const text = '易發車網 28car.com';
    // console.log("===============crawlerAction: ", text);
    Meteor.call('tasks.insert', text);
    Meteor.call('crawlers.test');
  }

  importMakersAction() {
    console.log('importMakersAction');
    Meteor.call('makers.import');
  }

  importModelsAction() {
    console.log('importMakersAction');
    Meteor.call('carmodels.import');
  }

  importCarClassesAction() {
    console.log('importCarClassesAction');
    Meteor.call('carclasses.import');
  }

  crawlBrandFromCarComAction() {
    console.log('getBrandFromCarComAction');
    Meteor.call('makers.crawlBrand');
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;

      return (
        <Task
          key={task._id}
          task={task}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1>

          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Completed Tasks
          </label>

          { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new tasks"
              />
            </form> : ''
          }
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
        <div>
          <button onClick={this.crawlerAction.bind(this)}>Crawler</button>
        </div>
        <div>
          <button onClick={this.importMakersAction.bind(this)}>Import Makers</button>
        </div>
        <div>
          <button onClick={this.importCarClassesAction.bind(this)}>Import Class Car</button>
        </div>
        <div>
          <button onClick={this.importModelsAction.bind(this)}>Import Model</button>
        </div>
        <div>
          <button onClick={this.crawlBrandFromCarComAction.bind(this)}>Crawl Brand</button>
        </div>
      </div>
    );
  }
}


CrawlerPage.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};

export default withTracker(() => {
  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(CrawlerPage);
