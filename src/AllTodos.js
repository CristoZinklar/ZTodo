import React, { useEffect, useState } from "react";
import Todo from "./components/Todo";

export default function AllTodos({ todoClass }) {
  const [tasks, setTasks] = useState(todoClass.tasks);
  const [filter, setFilter] = useState(todoClass.filter);

  useEffect(() => {
    const observer = (o) => {
      if (o.tasks !== tasks) {
        setTasks([...o.tasks]);
      }

      if (o.filter !== filter) {
        setFilter(o.filter);
        debugger;
        const taskFiltered = o.getTaskList();
        setTasks(taskFiltered);
      }
    };
    todoClass.subscribe(observer);
    return function cleanup() {
      todoClass.unsubscribe(observer);
    };
  }, [todoClass, tasks, filter]);

  return (
    <ul
      className="todo-list stack-large stack-exception"
      aria-labelledby="list-heading">
      {tasks?.map((task) => (
        <Todo
          id={task.id}
          name={task.name}
          completed={task.completed}
          key={task.id}
          toggleTaskCompleted={(id) => todoClass.toggleTaskCompleted(id)}
          deleteTask={(id) => todoClass.deleteTask(id)}
          editTask={(id, newName) => todoClass.editTask(id, newName)}
        />
      ))}
    </ul>
  );
}
