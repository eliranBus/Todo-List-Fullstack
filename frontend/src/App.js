import React from "react";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import Filter from "./components/Filter";
import { ToastProvider } from "react-toast-notifications";
import "./style/App.css";

function App() {
  return (
    <ToastProvider autoDismiss autoDismissTimeout={2000}>
      <div className="App">
        <h1>Todo List</h1>
        <AddTodo />
        <Filter />
        <Todos />
      </div>
    </ToastProvider>
  );
}

export default App;
