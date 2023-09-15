import React, { useState, useRef, useEffect } from "react";
import FunctionalTodoList from "./FunctionalTodoList";
import OOPTodoList from "./OOPTodoList";

const FUNCTIONAL = "Functional";
const OOP = "OOP";

const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];

function App() {
  const [appVersion, setAppVersion] = useState(FUNCTIONAL);

  return (
    <>
      <div>
        <button className={"btn"} onClick={() => setAppVersion(FUNCTIONAL)}>
          Functional
        </button>
        <button className={"btn"} onClick={() => setAppVersion(OOP)}>
          OOP
        </button>
      </div>
      <span>Active version: {appVersion}</span>
      {appVersion === FUNCTIONAL && <FunctionalTodoList tasks={DATA} />}
      {appVersion === OOP && <OOPTodoList />}
    </>
  );
}

export default App;
