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
    // BUSCARLO Y LUEGO CAMBIAR CON METODOS JS
    const found = todoList.find((lista) => lista.id === id);
    if (found) {
      found.completed = !e;
    } else {
      console.log("Objeto no encontrado");
    }
    console.log("found", found);
  };

  return (
    <AppContext.Provider
      value={{ user, setUser, todoList, setTodoList, handleCompleted }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default UserProvider;
