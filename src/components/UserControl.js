import React from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../app/firebase.js";
import { createTodoUsers, getListByUsers } from "../app/apiFirebaseUsers";
import { useUserContext } from "../providers/UserProvider";
import Login from "./Login";

const UserControl = () => {
  const {
    user,
    setUser,
    setIdUserGoogle,
    setUserHasListsFirebase,
    setTodoList,
    setIdListFirebase,
    creaListaFirebase,
    setListsFirebase,
    setNumberId,
    setTodoCompletedList,
    setTodoActivedList,
  } = useUserContext();

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

  const handleDeleteTasks = () => {
    setTodoList([]);
    setTodoCompletedList([]);
    setTodoActivedList([]);
  };
  return (
    <div className="usercontrolContainer">
      {/*     <div className="usercontrolContainer--buttonCont">
        {!user && (
          <button
            onClick={handleDeleteTasks}
            className="usercontrolContainer--buttonCont--button"
          >
            <p className="josefin--400"> Borrar tareas</p>
          </button>
        )}
      </div> */}
      <Login />
    </div>
  );
};

export default UserControl;
