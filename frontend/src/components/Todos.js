import React, { useEffect } from "react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { todosState, statusChangeFlagState } from "../recoil/atoms";
import { filteredTodoListState } from "../recoil/selectors";
import { useToasts } from "react-toast-notifications";
import axios from "axios";

const Todos = () => {
  const setTodos = useSetRecoilState(todosState);
  const [flag, setFlag] = useRecoilState(statusChangeFlagState);
  const todoList = useRecoilValue(filteredTodoListState);
  const { addToast } = useToasts();

  useEffect(() => {
    fetchTodos();
  }, [flag]);

  const fetchTodos = () => {
    axios.get("/todos").then((result) => setTodos(result.data));
  };

  const changeStatus = async (id) => {
    await axios.post(`/todo/${id}/complete`);
    setFlag(!flag);
    addToast("Todo status changed successfuly", {
      appearance: "success",
    });
  };

  const deleteTodo = async (id) => {
    await axios.post(`/todo/${id}/delete`);
    setFlag(!flag);
    addToast("Todo deleted successfuly", {
      appearance: "success",
    });
  };

  return (
    <div className="todos-container">
      <table>
        <thead>
          <tr>
            <th className="index">#</th>
            <th>name</th>
            <th>completed</th>
            <th className="trash"></th>
          </tr>
        </thead>
        <tbody>
          {todoList.map((todo, index) => (
            <tr key={todo.id} className={todo.isComplete ? "completed" : ""}>
              <td className="index">{index + 1}</td>
              <td>{todo.name}</td>
              <td className="status" onClick={() => changeStatus(todo.id)}>
                {todo.isComplete ? "👍" : "👎"}
              </td>
              <td className="trash" onClick={() => deleteTodo(todo.id)}>
                🗑
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Todos;
