import {
  collection,
  getDocs,
  query,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

// CREATE
export const createTodoUsers = async (obj) => {
  try {
    alert("bbbbbbbbbbbbbbbbb");
    const colRef = collection(db, "users");
    const data = await addDoc(colRef, obj);
    const id = data.id;
    // Actualiza el documento con el ID obtenido MODICANDO updateItem ya que añadimos ID y no los valores de las listas
    await updateDoc(doc(colRef, id), { idUserFirebase: id }); //AÑADIMOS NUMERO DOCUMENTO AL DOCX
    // addDoc -> ID DE PEDIDO
    return data.id;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

// UPDATE
export const updateItemUsers = async (id, obj) => {
  const colRef = collection(db, "users");
  await updateDoc(doc(colRef, id), obj);
};

// READ
export const getItemsUsers = async () => {
  const colRef = collection(db, "users");
  const result = await getDocs(query(colRef));
  return getArrayFromCollection(result);
};

// READ WITH WHERE
// Tener en cuenta que el tipo de dato de la condición debe coincidir con el tipo de dato que hay en Firebase o no obtendré un dato de respuesta
export const getItemsByConditionUsers = async (value) => {
  const colRef = collection(db, "users");
  const result = await getDocs(query(colRef, where("category", "==", value)));
  return getArrayFromCollection(result);
};
export const getItemsByIdUsers = async (value) => {
  const colRef = collection(db, "users");
  const result = await getDocs(query(colRef, where("id", "==", value)));
  return getArrayFromCollection(result);
};

export const getListByUsers = async (id) => {
  const colRef = collection(db, "users");
  const result = await getDocs(query(colRef, where("idUserGoogle", "==", id)));
  console.log('metodo',result);
  return getArrayFromCollection(result);
};


export const getToDoListByIdUsers = async (id) => {
  // OBTIENE CESTA COMPRA POR ID DE COLECCCION
  const colRef = collection(db, "users");
  const IDStr = id.toString();
  const result = await getDoc(doc(colRef, IDStr));
  return result.data();
};

/*
    
    export const getItemById = async (id) => {
      const colRef = collection(db, "users");
      const result = await getDoc(doc(colRef, id));
      return result.data();
    };
    
    // DELETE
    export const deleteItem = async (id) => {
      const colRef = collection(db, "users");
      await deleteDoc(doc(colRef, id));
    };*/

export const getArrayFromCollection = (collection) => {
  return collection.docs.map((doc) => {
    return { ...doc.data()
     };
  });
};
