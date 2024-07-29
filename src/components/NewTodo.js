import { useState } from "react";
import { useUserContext } from "../providers/UserProvider";

const NewTodo = () => {
  const { todoList, setTodoList } = useUserContext();
  const [newTodo, setNewTodo] = useState("");

  const handleChangeNewTodo = (e) => {
    setNewTodo(e.target.value);
  };

  const handleNewTodo = (e) => {
    const long = todoList.length;
   
    setTodoList([...todoList, { task: newTodo, completed: false, id: long }]);
    e.preventDefault();
  };

  return (
    <div className="newtodo">
      <form onSubmit={handleNewTodo} id="buscador" name="buscador">
        <input
          type="text"
          onChange={handleChangeNewTodo}
          placeholder="new todo"
          id="newtodo"
          className="newtodo--input"
        ></input>
      </form>
    </div>
  );
};

export default NewTodo;
