import {
  collection,
  getDocs,
  query,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

// CREATE
export const createTodo = async (obj) => {
  try {
    const colRef = collection(db, "todo");
    const data = await addDoc(colRef,obj);
    const id = data.id;
    // Actualiza el documento con el ID obtenido MODIFICANDO updateItem ya que añadimos ID y no los valores de las listas
    await updateDoc(doc(colRef, id), {idListFirebase: id });
    // addDoc -> ID DE PEDIDO
    return data.id;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

// UPDATE
export const updateItem = async (id, obj) => {
  const colRef = collection(db, "todo");
  await updateDoc(doc(colRef, id), obj);
};

// READ
export const getItems = async () => {
  const colRef = collection(db, "todo");
  const result = await getDocs(query(colRef));
  return getArrayFromCollection(result);
};

// READ WITH WHERE
// Tener en cuenta que el tipo de dato de la condición debe coincidir con el tipo de dato que hay en Firebase o no obtendré un dato de respuesta

export const getItemsById = async (value) => {
  const colRef = collection(db, "todo");
  const result = await getDocs(query(colRef, where("id", "==", value)));
  return getArrayFromCollection(result);
};


export const getToDoListById = async (id) => {
  // OBTIENE CESTA COMPRA POR ID DE COLECCCION
  const colRef = collection(db, "todo");
  const IDStr = id.toString();
  const result = await getDoc(doc(colRef, IDStr));
  return result.data();
};



export const getArrayFromCollection = (collection) => {
  return collection.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
};
