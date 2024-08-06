import { createContext, useState, useContext } from "react";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import { db } from "../app/firebase";
import { updateItem, getToDoListById } from "../app/api";

const AppContext = createContext();
export const useUserContext = () => useContext(AppContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("Rafa");

  const [todoList, setTodoList] = useState([]);
  const [todoActivedList, setTodoActivedList] = useState([]);
  const [todoCompletedList, setTodoCompletedList] = useState([]);
  const [index, setIndex] = useState(0);
  const [idListFirebase, setIdListFirebase] = useState("");
  const [listsFirebase, setListsFirebase] = useState([]);
  const [numberId, setNumberId] = useState(0);
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
    //subiraFirebase();
  };

  //BORRAR 1 ITEM
  const handleDelete = (id) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    console.log("list", newTodoList);
    setTodoList(newTodoList);
    subiraFirebase();
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

  //METODO COSECHA PROPIA. RECIBE DATOS FORMULARIO Y LOS LLEVA A BBDD

  const creaListaFirebase = () => async () => {
    const Listas = { todoList, todoActivedList, todoCompletedList }; //PARA QUE ME CREE LAS 3 LISTAS, 1 OBJ DE 3 PROPIEDADES
    // createTodo(Listas);
    const colRef = collection(db, "todo");
    const data = await addDoc(colRef, Listas).then((res) => alert(res.id));
  };

  const subiraFirebase = () => {
    const Listasw_ID = {
      todoList,
      todoActivedList,
      todoCompletedList,
      idListFirebase,
    };
    updateItem(idListFirebase, Listasw_ID);
  };

  const leerFirebase = async (idListFirebase) => {
    try {
      const valores = await getToDoListById(idListFirebase);
      console.log("valores", valores);
      setListsFirebase(valores); //FORZAR LISTA DE TASK SEA LA DE FIREBASE
      console.log("ahoraaaaaaaaaaaaaaa");
      setTodoList((prevState) => {
        const newState = valores.todoList;
        // Hacer algo con el nuevo estado aquí si es necesario
        MaxValueId(newState);
        console.log("New State:", newState);
        return newState;
      });
    } catch (error) {
      console.log("Error fetching todo list:", error);
    }
    MaxValueId();
  };

  const MaxValueId = (newState) => {
    //console.log('newStateMaximus',newState);
    let maxId = 0;
    //  alert("maximusssssssssssss"); //BUSCAR VALOR MAX ID EXISTENTE EN FIREBASE
    // const maxId = todoList.reduce((max, item) => ((item.id) > (max) ? (item.id) : (max), todoList[0].id));
    newState &&
      (maxId = newState.reduce(
        (max, item) => Math.max(max, item.id),
        newState[0].id
      ));
    /*    newState.length > 0
        ? newState.reduce((max, item) => Math.max(max, item.id), newState[0].id)
        : null; */
    console.log("el id max es", maxId);
    // const res = maxId;
    setNumberId(maxId + 1); //ACTUALIZAR EL VALOR MAXIMO
  };

  /*

  const subiraFirebase = () => {
    const precioTotal = totalPrice();
    const datosPedido = {
      carrito,
      customer,
      precioTotal,
      date: serverTimestamp(),
    };
 */

  //ENVIAR DATOS A FIRESTORE
  /*   const colRef = collection(db, "todo");
    const data = addDoc(colRef, datosPedido).then((res) =>   */ ///OJOOOOOO datosPEdido??
  /*       setUser(res.id)
    );  */ // addDoc -> ID DE PEDIDO

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
        idListFirebase,
        setIdListFirebase,
        creaListaFirebase,
        subiraFirebase,
        leerFirebase,
        setListsFirebase,
        numberId,
        setNumberId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default UserProvider;
