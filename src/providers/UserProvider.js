import { createContext, useState, useContext } from "react";
import {
  serverTimestamp,
  collection,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../app/firebase";
import { updateItem, getToDoListById } from "../app/api";
import { createTodoUsers } from "../app/apiFirebaseUsers";

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
  const [idUserGoogle, setIdUserGoogle] = useState("");
  const [userHasListsFirebase, setUserHasListsFirebase] = useState([]);
  
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
    user&&subiraFirebase();
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
  // FIREBASE

  //METODO COSECHA PROPIA. RECIBE DATOS FORMULARIO Y LOS LLEVA A BBDD

  const creaListaFirebase= async () => {
    const Listas = { todoList, todoActivedList, todoCompletedList }; //PARA QUE ME CREE LAS 3 LISTAS, 1 OBJ DE 3 PROPIEDADES
    // createTodo(Listas);
    /*  const colRef = collection(db, "todo");
    const data = await addDoc(colRef, Listas).then((res) => alert(res.id)); */
    try {
      const colRef = collection(db, "todo");
      const data = await addDoc(colRef, Listas);
      const id = data.id;
      // Actualiza el documento con el ID obtenido MODICANDO updateItem ya que añadimos ID y no los valores de las listas
      await updateDoc(doc(colRef, id), { idListFirebase: id });
      // addDoc -> ID DE PEDIDO
      return data.id;
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  };

  const subiraFirebase = () => {
    console.log("idListFirebase", idListFirebase);

    const Listasw_ID = {
      todoList,
      todoActivedList,
      todoCompletedList,
      idListFirebase,
    };
    console.log("Listasw_ID", Listasw_ID);
    alert("subirafirebase");
    updateItem(idListFirebase, Listasw_ID); //actualizo valor de las 3 listas con id del doc
  };

  const leerFirebase = async (param) => {
    console.log("param", param);
    alert("he pasado param a metodo para descargar datos");
    try {
      alert("VOY A LEER DATOS EN FIREBASE DE ID GUARDADA EN USERS");
      const valores = await getToDoListById(param);
      console.log("valores obtenidos de Firebase", valores);
      valores && setListsFirebase(valores); //FORZAR LISTA DE TASK SEA LA DE FIREBASE
      valores &&
        setTodoList((prevState) => {
          const newState = valores.todoList;
          // Hacer algo con el nuevo estado aquí si es necesario
          MaxValueId(newState); //reviso valor máximo del id del array para q las nuevas task el id sea mayor
          console.log(
            "Valor maximo indice array guardado en Firebase:",
            newState
          );
          return newState;
        });
    } catch (error) {
      console.log("Error fetching todo list:", error);
    }
  };

  const MaxValueId = (newState) => {
    let maxId = 0;
    alert("maximusssssssssssss"); //BUSCAR VALOR MAX ID EXISTENTE EN FIREBASE
    newState.length > 0 &&
      (maxId = newState.reduce(
        (max, item) => Math.max(max, item.id),
        newState[0].id
      ));
    console.log("el id max es", maxId);
    setNumberId(maxId + 1); //ACTUALIZAR EL VALOR MAXIMO
  };
  //________________________________________________________________________
  /* FIREBASE USERS GOOGLE */

  const creaListaFirebaseGoogle = async () => {
    try {
      alert("aaaaaaaaaaaaaaaaa");
      const usuarios = await { idUserGoogle, idListFirebase }; //PARA QUE ME CREE LoS 2 IDENTIFICADORES(LISTA ID Y USER GOOGLE), 1 OBJ DE 2 PROPIEDADES
      createTodoUsers(usuarios); //AÑADO ID DOCUMENTO DE BD AL DOC
    } catch (error) {
      console.log("Error fetching todo list:", error);
    }
  };

  const leerFirebaseGoogleusers = async (idUserFirebase) => {
    try {
      const valoresUsers = await getToDoListById(idUserFirebase);
      console.log("valores", valoresUsers);
      //??   setUsersListsFirebase(valoresUsers); //FORZAR LISTA DE TASK SEA LA DE FIREBASE
      /*       setTodoList((prevState) => {
        const newState = valoresUsers.todoList;
        // Hacer algo con el nuevo estado aquí si es necesario

        return newState;
      }); */
    } catch (error) {
      console.log("Error fetching todo list:", error);
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
        idListFirebase,
        setIdListFirebase,
        creaListaFirebase,
        subiraFirebase,
        leerFirebase,
        listsFirebase,
        setListsFirebase,
        numberId,
        setNumberId,
        idUserGoogle,
        setIdUserGoogle,
        creaListaFirebaseGoogle,
        userHasListsFirebase,
        setUserHasListsFirebase,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default UserProvider;
