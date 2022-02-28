import React, { useState, useRef } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { todosState, statusChangeFlagState } from "../recoil/atoms";
import axios from "axios";
import { useToasts } from "react-toast-notifications";

const AddTodo = () => {
  const todoList = useRecoilValue(todosState);
  const [value, setValue] = useState("");
  const [flag, setFlag] = useRecoilState(statusChangeFlagState);
  const input = useRef();
  const { addToast } = useToasts();

  const addTodo = async (e) => {
    e.preventDefault();
    const newTodo = value.charAt(0).toUpperCase() + value.slice(1);
    let todoExists = true;

    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].name === newTodo) {
        todoExists = true;
        addToast("Todo already exists", { appearance: "error" });
        break;
      } else if (value === "") {
        addToast("Please add todo's name", { appearance: "error" });
        break;
      } else {
        todoExists = false;
      }
    }

    if (!todoExists) {
      addToast("Todo added to list", { appearance: "success" });
      await axios.post("/todo", { name: newTodo });
      setValue("");
      setFlag(!flag);
    }

    input.current.focus();
  };

  return (
    <div className="add-todo-wrapper">
      <form className="add-todo-form">
        <input
          ref={input}
          type="text"
          name="name"
          id="name"
          placeholder="Todo's name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" onClick={(e) => addTodo(e)}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
