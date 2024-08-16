import React, { useEffect } from "react";
import Router from "./app/Router.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./app/firebase.js";
import { useUserContext } from "./providers/UserProvider";
import {getListByUsers, createTodoUsers} from './app/apiFirebaseUsers';

const App = () => {
  const {
    user,
    setUser,
    setIdUserGoogle,
    setUserHasListsFirebase,
    setTodoList,
    idListFirebase,
    setIdListFirebase,
    creaListaFirebase,
    creaListaFirebaseGoogle,
    idUserGoogle,
    setListsFirebase,
    setNumberId,
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
      if (listadoUsuario.length == 0) { //GOOGLE USER NUEVO, SIN LISTAS
        alert("NO TIENES LISTAS para este usuario de Google");
        creaListaFirebase()().then((result) => { // CREA 1 ID DE LISTA DE TAREAS NUEVAS, TOMA EL VALOR ID DE LAS LISTA DE RESULTADO FUNCION
        setIdListFirebase(result); //SETEAMOS IDLISTFIREBASE EN CONTEXT
        const binomio = { "idUserGoogle": iden, "idListFirebase":result };
        createTodoUsers(binomio);
        alert("HEMOS CREADO NUEVA LISTA PARA UN USER SIN LISTAS EXISTENTES??");
        console.log("IDLISTFIREBASE A AÑADIR A FIREBASE ", result);
        });

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
        setUser((prevState) => { //DATOS USUARIO IDENTIFICADO DE GOOGLE
          const newState = user;
          setIdUserGoogle(newState.uid); //DATO ID USUARIO GOOGLE
          console.log("EN APP 1A ID DE AUTENTICACION GOOGLE", newState.uid);
          obtenerListadoUserFirebase(newState.uid); //BUSCA EN COLECCION FB-USER SI TENEMOS ASOCIADA ALGUNA ID DE LISTAS+CREA LISTA EN FB Y SETEA IDLIST EN CONTEXT //O LEE LA YA ASOCIADA Y SETEA LA ID EN CONTEXT
          return newState;
        });
      } else {   // AL HACER LOGOUT BORRO DATOS USUARIO EN CONTEXT
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

  return (
    <div className="App">
      <Router />
    </div>
  );
};

export default App;
