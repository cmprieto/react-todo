import TodoContainerList from "./TodoContainerList";
import NewTodo from "./NewTodo";
import Footer from "./Footer";
import { useUserContext } from "../providers/UserProvider";
import Login from "./Login";
import { useEffect } from "react";
import { createTodo } from "../app/api";

const TodoContainer = () => {
  const {
    leerFirebase,
    setIdListFirebase,
    idListFirebase,
    todoList,
    todoActivedList,
    todoCompletedList,
    setTodoActivedList,
    setTodoCompletedList,
    setTodoList,
  } = useUserContext();

  /*   getListByUsers */
  const createAnonimUser = async () => {
    //CREO FUNCIONA , DEsAcTIVO TEMPORALMENTE . USO PARA CUANDO NO HAY LISTA IdListFirebase PARA ESE USUARIO
    const Listas = {
      todoList,
      todoActivedList,
      todoCompletedList,
      idUser: "anonimo",
    }; //PARA QUE ME CREE LAS 3 LISTAS, 1 OBJ DE 3 PROPIEDADES
    try {
      const listId = await createTodo(Listas);
      console.log("ID de lista para usuario anonimo", listId);
      setIdListFirebase(listId);
    } catch (error) {
      alert("error AÑADIENDO ID A ESTADO");
    }
  };

  const handleAnonimUser = () => {
    //listas con usuario anonimo
    createAnonimUser();
    alert("creada listado anonimo");
  };

  const handleDeleteTasks = () => {
    setTodoList([]);
    setTodoCompletedList([]);
    setTodoActivedList([]);
  };

  return (
    <div className="todocontainer">
      <div className="todocontainer--h1">
        <h1 className="josefin--700">To Do List</h1>
        {/*        <button onClick={createUser}>Recuperar UserList</button> */}
        {/*  //DA ERROR */}
        <button onClick={handleAnonimUser}>Usuario anonimo</button>
        <button onClick={handleDeleteTasks}>Borrar tareas</button>
        <Login />
        {/* {!user ? <Login /> : <div><p>{user.displayName}</p></div>} */}
      </div>
      <NewTodo />
      <TodoContainerList />
      <Footer />
    </div>
  );
};

export default TodoContainer;
