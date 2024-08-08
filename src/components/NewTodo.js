import {  useRef, useEffect } from "react";
import { useUserContext } from "../providers/UserProvider";

const NewTodo = () => {
  const { todoList, setTodoList, subiraFirebase, numberId, setNumberId } =
    useUserContext();
  const newToDoText = useRef(null);

  useEffect(() => {
    newToDoText.current.focus();
  }, [todoList]);

  const actualizarId = () => {
    setNumberId((prevState) => {
      const newState = prevState + 1;
      return newState;
    });
  };

  const handleNewTodo = (e) => {
    const newTask = newToDoText.current.value;
    console.log('numberId',numberId);
    numberId >= 0 &&
      newTask &&
      setTodoList((prevState) => {
        const newState = [
          ...todoList,
          { task: newTask, completed: false, id: numberId },
        ];
        return newState;
      });

    //  (numberId >= 0 && newTask )&& updateItem(idListFirebase,{ ...todoList, task: newTask, completed: false, id: numberId })
    e.preventDefault();
    actualizarId();
    subiraFirebase();
    newToDoText.current.value = ""; //BORRA FORMULARIO AL ENTRAR VALOR
  };

  return (
    <div className="newtodo">
      <form
        onSubmit={handleNewTodo}
        className="newtodo--form"
        id="buscador"
        name="buscador"
      >
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
