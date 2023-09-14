import React from "react";
import { nanoid } from "nanoid";
import AllTodos from "./AllTodos";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = {
  ALL: "All",
  ACTIVE: "Active",
  COMPLETED: "Completed",
};

class TodoList {
  #observers;
  constructor(tasks) {
    this._tasks = tasks;
    this.#observers = [];
    this._filter = FILTER_NAMES.ALL;
  }

  get tasks() {
    return this._tasks;
  }

  get filter() {
    return this._filter;
  }

  set filter(filter) {
    this._filter = filter;
    this.#observers.forEach((f) => f(this));
  }

  toggleTaskCompleted(id) {
    const updatedTasks = this._tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new obkect
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    this._tasks = updatedTasks;

    this.#observers.forEach((f) => f(this));
  }

  deleteTask(id) {
    const remainingTasks = this.tasks.filter((task) => id !== task.id);
    this._tasks = remainingTasks;
    this.#observers.forEach((f) => f(this));
  }

  editTask(id, newName) {
    const editedTaskList = this.tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName };
      }
      return task;
    });
    this._tasks = editedTaskList;
    this.#observers.forEach((f) => f(this));
  }

  getTaskList() {
    const taskFiltered = this.tasks.filter(FILTER_MAP[this._filter]);
    return taskFiltered;
  }

  addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    this._tasks = [...this.tasks, newTask];
    this.#observers.forEach((f) => f(this));
  }

  subscribe(observer) {
    if (this.#observers.indexOf(observer) === -1) {
      this.#observers.push(observer);
    }
  }

  unsubscribe(observer) {
    this.#observers = this.#observers.filter((f) => {
      return f !== observer;
    });
  }

  render() {
    const tasksNoun = this.tasks.length !== 1 ? "tasks" : "task";
    const headingText = `${this.tasks.length} ${tasksNoun} remaining`;

    return (
      <div className="todoapp stack-large">
        <Form addTask={(name) => this.addTask(name)} />
        <div className="filters btn-group stack-exception">
          {Object.values(FILTER_NAMES).map((name) => (
            <FilterButton
              key={name}
              name={name}
              isPressed={name === this._filter}
              setFilter={(newFilter) => (this.filter = newFilter)}
            />
          ))}
        </div>
        <h2 id="list-heading" tabIndex="-1">
          {headingText}
        </h2>
        <AllTodos todoClass={this} />
      </div>
    );
  }
}

export default TodoList;
