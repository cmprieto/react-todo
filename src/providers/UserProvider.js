import { createContext, useState, useContext } from "react";

const AppContext = createContext();
export const useUserContext = () => useContext(AppContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("Rafa");
  const [todoList, setTodoList] = useState([]);
  const [todoActivedList, setTodoActivedList] = useState([]);
  const [todoCompletedList, setTodoCompletedList] = useState([]);
  const [index, setIndex] = useState(0);

  //METODOS

  //CAMBIAR ESTADOS CUANDO TAREA COMPLETED(checked) O unchecked
  const handleCompleted = (id, check) => {
    console.log("e", check);
    console.log("id", id);
    //BUSCAR Y MODIFICAR UN ELEMENTO DEL ARRAY estado checked
    // In this refactored version, we create a new copy of the todoList state using the map() method, and update the completed property of the matching item using the e.target.checked value.
    const updatedTodoList = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, completed: check };
      }
      return item;
    });
    console.log("updatedTodoList", updatedTodoList);
    setTodoList(updatedTodoList);
  };

  //BORRAR 1 ITEM
  const handleDelete = (id) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    console.log("list", newTodoList);
    setTodoList(newTodoList);
    return null;
  };
  // MOSTRAR ACTIVAS
  const handleActive = () => {
    const newActiveList = todoList.filter((item) => item.completed === false);
    setTodoActivedList(newActiveList);
    setIndex(1);
    return newActiveList.length;
  };

  const getNumberItemsCompleted = () => {
    const newActiveList = todoList.filter((item) => item.completed === false);
    setTodoActivedList(newActiveList);
  };

  // MOSTRAR COMPLETADAS
  const handleCompletedList = () => {
    const newCompletedList = todoList.filter((item) => item.completed === true);
    setTodoCompletedList(newCompletedList);
    setIndex(2);
    return null;
  };

  // BORRAR TODAS TAREAS COMPLETADAS
  const handleClearCompleted = () => {
    const isAnyItemCompleted = todoList.some((item) => item.completed);
    //alert(isAnyItemCompleted);
    console.log("todoActivedList", todoActivedList);
    if (isAnyItemCompleted === true) {
      setTodoList((prevState) => {
        return prevState.filter((item) => item.completed === false);
      });
    }
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
        handleActive,
        handleCompletedList,
        todoActivedList,
        setTodoActivedList,
        handleClearCompleted,
        index,
        setIndex,
        getNumberItemsCompleted,
        todoCompletedList,
        setTodoCompletedList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default UserProvider;
