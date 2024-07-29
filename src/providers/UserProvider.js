import { createContext, useState, useContext } from "react";

const AppContext = createContext();
export const useUserContext = () => useContext(AppContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("Rafa");
  const [todoList, setTodoList] = useState([]);

  //METODOS
  //CAMBIAR ESTADOS CUANDO TAREA COMPLETED(checked) O NO
  const handleCompleted = (id, e) => {
    console.log("e", e);
    console.log("id", id);
    //BUSCAR Y MODIFICAR UN ELEMENTO DEL ARRAY
    // In this refactored version, we create a new copy of the todoList state using the map() method, and update the completed property of the matching item using the e.target.checked value.
    const updatedTodoList = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, completed: e };
      }
      return item;
    });
    console.log('updatedTodoList',updatedTodoList)
    setTodoList(updatedTodoList);

    // BUSCARLO Y LUEGO CAMBIAR CON METODOS JS
    const found = todoList.find((lista) => lista.id === id);
    if (found) {
      found.completed = !e; //ERRORES CAMBIA DIRECTAMENTE PROPIEDAD
    } else {
      console.log("Objeto no encontrado");
    }
    console.log("found", found);
  };

  //BORRAR 1 ITEM
  const handleDelete = (id) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    console.log("list", newTodoList);
    setTodoList(newTodoList);
    //setTodoList(list);
  };
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        todoList,
        setTodoList,
        handleCompleted,
        handleDelete,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default UserProvider;
