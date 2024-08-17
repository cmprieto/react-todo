import React from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../app/firebase.js";
import { createTodoUsers, getListByUsers } from "../app/apiFirebaseUsers";
import { useUserContext } from "../providers/UserProvider";
import { createTodo } from "../app/api";
import Login from "./Login";

const UserControl = () => {
  const {
    user,
    setUser,
    setIdUserGoogle,
    idUserGoogle,
    setUserHasListsFirebase,
    setTodoList,
    setIdListFirebase,
    creaListaFirebase,
    setListsFirebase,
    setNumberId,
    setTodoCompletedList,
    setTodoActivedList,
    todoList,
    todoActivedList,
    todoCompletedList,
  } = useUserContext();

  /*  const obtenerListadoUser = async (iden) => {
    try {
      const listadoUsuario = await getListByUsers(iden); //METODO DE FIREBASE QUE OBTENGO LAS LISTAS Q TIENE EL USUARIO AUTENTICADO
      setUserHasListsFirebase((prevState) => { // ARRAY DE LISTAS QUE TIENE UN USUARIO AUTENTICADO CON GOOGLE
        const newState = listadoUsuario;
         const primervalor=listadoUsuario[0].idListFirebase;
         setIdListFirebase(primervalor);
         console.log('primervalor',primervalor);  //necesito dar valor a lista de task de firebase asociada
        return newState;
      });
      //necesito dar valor a lista de task de firebase asociada
      console.log("resutladolistasUsuario", listadoUsuario);
    } catch (error) {
      // Manejo de errores
      console.error("Error fetching users:", error);
    }
  }; */

  const obtenerListadoUserFirebase = async (iden) => {
    try {
      const listadoUsuario = await getListByUsers(iden); //DEVUELVE 1 O + LISTAS DE UN USER DE GOOGLE
      console.log("listado_de_Usuario_de_Google", listadoUsuario);
      if (listadoUsuario.length === 0) {
        //GOOGLE USER NUEVO, SIN LISTAS
        alert("NO TIENES LISTAS para este usuario de Google");
        const newListId = await creaListaFirebase();
        console.log("setIdListFirebase", newListId);
        setIdListFirebase(newListId);
        //   creaListaFirebase()().then((result) => { // CREA 1 ID DE LISTA DE TAREAS NUEVAS, TOMA EL VALOR ID DE LAS LISTA DE RESULTADO FUNCION
        //      setIdListFirebase(result); //SETEAMOS IDLISTFIREBASE EN CONTEXT
        const binomio = { idUserGoogle: iden, idListFirebase: newListId };
        const binomioIds = await createTodoUsers(binomio);
        alert("HEMOS CREADO NUEVA LISTA PARA UN USER SIN LISTAS EXISTENTES??");
        console.log("binomioIds A AÑADIR A FIREBASE ", binomioIds);
        return newListId;
      } else {
        alert("TENEMOS LISTA para este usuario de Google");
        const newState = listadoUsuario;
        const firstListId = newState[0]?.idListFirebase; // use optional chaining to avoid null/undefined errors
        setUserHasListsFirebase(newState);
        setIdListFirebase(firstListId);
        console.log("primervalor", firstListId);
        console.log("resutladolistasUsuario", listadoUsuario);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user", user, " userId:", user.uid);
        const userId = user.uid;
        setIdUserGoogle(userId); //DATO ID USUARIO GOOGLE
        setUser(user); //DATOS USUARIO IDENTIFICADO DE GOOGLE
        console.log("EN APP 1A ID DE AUTENTICACION GOOGLE", userId);
        obtenerListadoUserFirebase(userId); //BUSCA EN COLECCION FB-USER SI TENEMOS ASOCIADA ALGUNA ID DE LISTAS+CREA LISTA EN FB Y SETEA IDLIST EN CONTEXT //O LEE LA YA ASOCIADA Y SETEA LA ID EN CONTEXT

        /*      try {
          const listado_de_Usuario_de_Google = await obtenerListadoUserFirebase(userId);       
           console.log(
            "listado_de_Usuario_de_Google",
            listado_de_Usuario_de_Google
          );
        } catch (error) {
          console.log("error", error);
        } */
        /*      setUser((prevState) => {
          //DATOS USUARIO IDENTIFICADO DE GOOGLE
          const newState = user;
          setIdUserGoogle(newState.uid); //DATO ID USUARIO GOOGLE
          console.log("EN APP 1A ID DE AUTENTICACION GOOGLE", newState.uid);
          obtenerListadoUserFirebase(newState.uid); //BUSCA EN COLECCION FB-USER SI TENEMOS ASOCIADA ALGUNA ID DE LISTAS+CREA LISTA EN FB Y SETEA IDLIST EN CONTEXT //O LEE LA YA ASOCIADA Y SETEA LA ID EN CONTEXT
          return newState;
        }); */
      } else {
        // AL HACER LOGOUT BORRO DATOS USUARIO EN CONTEXT
        console.log("No user logged");
        setUser(null);
        setIdUserGoogle(null);
        setIdListFirebase("");
        setTodoList([]);
        setListsFirebase([]);
        setNumberId(0);
        setUserHasListsFirebase([]);
      }
    });
  }, [user]);

  /*   getListByUsers */
  const createAnonimUser = async () => {
    //NO CAL
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
    //NO CAL
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
    <div className="usercontrolContainer">
      {
        <div className="usercontrolContainer--buttonCont">
          {/*   <button
            onClick={handleAnonimUser}
            className="usercontrolContainer--buttonCont--button"
          >
            <p className="josefin--400">Anonimous</p>
          </button> */}

          {!user && (
            <button
              onClick={handleDeleteTasks}
              className="usercontrolContainer--buttonCont--button"
            >
              <p className="josefin--400"> Borrar tareas</p>
            </button>
          )}
        </div>
      }

      <Login />
    </div>
  );
};

export default UserControl;
