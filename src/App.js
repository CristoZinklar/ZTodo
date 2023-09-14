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
        <button onClick={() => setAppVersion(FUNCTIONAL)}>Functional</button>
        <button onClick={() => setAppVersion(OOP)}>OOP</button>
      </div>
      {appVersion === FUNCTIONAL && <FunctionalTodoList tasks={DATA} />}
      {appVersion === OOP && <OOPTodoList tasks={DATA} />}
    </>
  );
}

export default App;
