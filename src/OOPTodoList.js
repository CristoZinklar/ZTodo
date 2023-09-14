import React from "react";
import TodoList from "./TodoList";

const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];

const todoList = new TodoList(DATA);

function OOPTodoList() {
  return <>{todoList.render()}</>;
}

export default OOPTodoList;
