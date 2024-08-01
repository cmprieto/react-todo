import { useState, useRef } from "react";
import { useUserContext } from "../providers/UserProvider";

const NewTodo = () => {
  const { todoList, setTodoList } = useUserContext();
  const [numberId, setNumberId] = useState(0);
  const newToDoText = useRef(null);



  const actualizarId = () => {
    setNumberId((prevState) => {
      const newState = prevState + 1;
      return newState;
    });
  };

  const handleNewTodo = (e) => {
    const newTodo2 = newToDoText.current.value;
    (numberId>=0 && newTodo2) &&
      setTodoList([...todoList, { task: newTodo2, completed: false, id: numberId }]);
    e.preventDefault();
    actualizarId();
    newToDoText.current.value = ""; //BORRA FORMULARIO AL ENTRAR VALOR
  };

  return (
    <div className="newtodo">
      <form onSubmit={handleNewTodo} className="newtodo--form" id="buscador" name="buscador">
        <input
          type="text"
          placeholder="create a new todo"
          id="newtodo"
          className="newtodo--input"
          ref={newToDoText}
        ></input>
      </form>
    </div>
  );
};

export default NewTodo;
