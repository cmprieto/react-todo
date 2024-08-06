import TodoContainerListComponent from "./TodoContainerListComponent";
import { useUserContext } from "../providers/UserProvider";
import BottomList from "./BottomList";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoContainerList = () => {
  const {
    todoList,
    index,
    todoActivedList,
    todoCompletedList,
    setTodoList,
    idListFirebase,
    leerFirebase,
  } = useUserContext();

  const selectedList = ["todoList", "todoActivedList", "todoCompletedList"];
  //  const [items, setItems] = useState();
  const lista = selectedList[index];
  console.log(lista);
  const [inicio, setInicio] = useState();

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

  console.log(list, "list");
  /* `${selectedList[index]}` */

  useEffect(() => {
  //  idListFirebase && leerFirebase();
  }, [list]);

  return (
    <div className="cont">
      <div className="todolistcontainer">
        <DragDropContext onDragEnd={handleDragEnd}>
          <form className="todolistcontainer--form">
            <Droppable droppableId="droppable" direction="vertical">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {list.map((todoitem, index) => {
                    return (
                      <Draggable
                        index={index}
                        draggableId={todoitem.id.toString()}
                        key={todoitem.id}
                        /* className="todocomponentcontainer" */
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
      <p className=" josefin--700">Drag and drop to reorder list</p>
    </div>
  );
};

export default TodoContainerList;
