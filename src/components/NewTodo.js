import { useState, useRef } from "react";
import { useUserContext } from "../providers/UserProvider";

const NewTodo = () => {
  const { todoList, setTodoList } = useUserContext();
  const [newTodo, setNewTodo] = useState("");
  const newToDoText = useRef(null);

  const handleChangeNewTodo = (e) => {
    setNewTodo(e.target.value);
  };

  const handleNewTodo = (e) => {
    const long = todoList.length;
    const newTodo2 = newToDoText.current.value;
    newTodo2 &&
      setTodoList([
        ...todoList,
        { task: newTodo2, completed: false, id: long },
      ]);
    e.preventDefault();
    newToDoText.current.value = "";
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
          ref={newToDoText}
        ></input>
      </form>
    </div>
  );
};

export default NewTodo;
