import TodoContainerListComponent from "./TodoContainerListComponent";
import { useUserContext } from "../providers/UserProvider";
import BottomList from "./BottomList";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect } from "react";

const TodoContainerList = () => {
  const {
    todoList,
    index,
    todoActivedList,
    todoCompletedList,
    setTodoList,
    idListFirebase,
    idUserGoogle,
    leerFirebase,
    user,
  } = useUserContext();

  const selectedList = ["todoList", "todoActivedList", "todoCompletedList"];

  const lista = selectedList[index];
  console.log(
    'nombre formato string de lista q se muestra x pantalla de las 3:todoList", "todoActivedList", "todoCompletedList"',
    lista
  );

  //DEFINE QUE LISTA FILTRADA SE MUESTRA X PANTALLA
  /* const data; */
  const list =
    selectedList[index] === "todoList"
      ? todoList
      : selectedList[index] === "todoActivedList"
      ? todoActivedList
      : selectedList[index] === "todoCompletedList"
      ? todoCompletedList
      : alert("no coincide");

  //CONFIGURACION DRANG AND DROP

  //___________________________________________________

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result.map((data, index) => ({ ...data, order: index }));
  };
  //____________________________________________

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const itms = reorder(
      todoList,
      result.source.index,
      result.destination.index
    );
    setTodoList(itms); // Esto actualiza el estado de los items para que se pinten reordenados en pantalla
    // OJO SOLO VA BIEN CON LA LISTA DE TODOS LOS ELEMENTOS-> HAY QUE ANALIZAR QUE HAY QUE ACTUALIZAR CUANDO HAY FILTROS
    // updateItems(items); //Esto actualiza el valor en firebase
  };

  // ____________________________
  const handleDragEnd = (result) => {
    onDragEnd(result);
    console.log("drag end");
  };

  console.log(
    "corresponde a list q se muestra x pantalla, todolist, completed o active: formato array de objetos:",
    list
  );

//TRADUCIR FORMATO DATA DE SERVIDOR
  const lastRefresh = () => {
    const lastRefreshAt = user.reloadUserInfo.lastRefreshAt;
    if (!lastRefreshAt) return null; // or some default value

    const date = new Date(lastRefreshAt);
    const formattedDate = new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "UTC",
    }).format(date);

    console.log(formattedDate);
    return formattedDate;
  };

  useEffect(() => {
    //LEER VALORES EN FIREBASE
    user && idListFirebase && leerFirebase(idListFirebase);
  }, [idListFirebase]);

  return (
    <div className="cont">
      <div className="todolistcontainer">
        <DragDropContext onDragEnd={handleDragEnd}>
          <form className="todolistcontainer--form">
            <Droppable droppableId="droppable" direction="vertical">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {list &&
                    list.map((todoitem, index) => {
                      return (
                        <Draggable
                          index={index}
                          draggableId={todoitem.id.toString()}
                          key={todoitem.id}
                        >
                          {(provided) => (
                            <TodoContainerListComponent
                              itemtodo={todoitem}
                              ref={provided.innerRef}
                              draggableProps={provided.draggableProps}
                              dragHandleProps={provided.dragHandleProps}
                              key={todoitem.id}
                            />
                          )}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </form>
        </DragDropContext>
        <BottomList />
      </div>
      <p className=" josefin--700 cont--drag">Drag and drop to reorder list</p>

      {user && (
        <div className="cont--userInfo">
          <p className=" josefin--700">email: {user.email}</p>
          <p className=" josefin--700">
            created at: {user.metadata.creationTime}
          </p>
          <p className=" josefin--700">last refresh At: {lastRefresh()}</p>
          <p className=" josefin--700">id task list: {idListFirebase}</p>
          <p className=" josefin--700">id user: {idUserGoogle}</p>
        </div>
      )}
    </div>
  );
};

export default TodoContainerList;
