import { useRef } from "react";
import { useUserContext } from "../providers/UserProvider";

const NewTodo = () => {
  const { todoList, setTodoList, subiraFirebase, numberId, setNumberId, user } =
    useUserContext();
  const newToDoText = useRef(null);

  const actualizarId = () => {
    setNumberId((prevState) => {
      const newState = prevState + 1;
      return newState;
    });
  };

  //AÑADIR TASK A CONTEXT Y SUBIR A FIREBASE

  const handleNewTodo = (e) => {
    e.preventDefault();
    const newTask = newToDoText.current.value;
    console.log("newTask", newTask);
    console.log("numberId", numberId);
    const nuevaTarea = { task: newTask, completed: false, id: numberId };
    numberId >= 0 &&
      newTask &&
      setTodoList((prevState) => {
        const newState = [...todoList, nuevaTarea];
        return newState;
      });

    actualizarId();
    user && subiraFirebase();
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
