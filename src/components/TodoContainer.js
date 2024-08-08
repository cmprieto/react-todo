import TodoContainerList from "./TodoContainerList";
import NewTodo from "./NewTodo";
import Footer from "./Footer";
import { useUserContext } from "../providers/UserProvider";
import Login from "./Login";


const TodoContainer = () => {
  const { leerFirebase, setIdListFirebase, user, setUser } = useUserContext();

  const createUser = () => {
    setIdListFirebase((prevState) => {
      const newState = "QzK3t2VunjERtdV38vJP";
      leerFirebase(newState);
      return newState;
    });
  };

  /* const createUser = async () => {  //CREO FUNCIONA , DEsAcTIVO TEMPORALMENTE . USO PARA CUANDO NO HAY LISTA IdListFirebase PARA ESE USUARIO

    const Listas = {
      todoList,
      todoActivedList,
      todoCompletedList,
    }; //PARA QUE ME CREE LAS 3 LISTAS, 1 OBJ DE 3 PROPIEDADES
    try {
      const listId = await createTodo(Listas);
      console.log("data", listId);
      setIdListFirebase(listId);
    } catch (error) {
      alert("error AÑADIENDO ID A ESTADO");
    }
  }; */
  /*   useEffect(() => {
    //LEER VALORES EN FIREBASE
    //   idListFirebase && leerFirebase();
  }, [todoList]); */
  return (
    <div className="todocontainer">
      <div className="todocontainer--h1">
        <h1 className="josefin--700">To Do List</h1>
        <button onClick={createUser}>Create UserList</button>
        {!user ? <Login /> : <div><p>{user.displayName}</p></div>}
      </div>
      <NewTodo />
      <TodoContainerList />
      <Footer />
    </div>
  );
};

export default TodoContainer;
