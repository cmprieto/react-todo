import TodoContainerListComponent from "./TodoContainerListComponent";
import NewTodo from "./NewTodo";
import { useUserContext } from "../providers/UserProvider";
import BottomList from "./BottomList";
import { useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const TodoContainerList = () => {
  const { todoList, index, todoActivedList, todoCompletedList } =
    useUserContext();
  const selectedList = ["todoList", "todoActivedList", "todoCompletedList"];
  const lista = selectedList[index];
  console.log(lista);

  const list =
    selectedList[index] === "todoList"
      ? todoList
      : selectedList[index] === "todoActivedList"
      ? todoActivedList
      : selectedList[index] === "todoCompletedList"
      ? todoCompletedList
      : alert('no coincide');

      const onDragEnd = (result) => {
  
      };
  console.log(list, "list");
  /* `${selectedList[index]}` */
  useEffect(() => {
    /*  console.log(selectedList[0]) ; */
  }, [list]);

  return (
    <div className="todolistcontainer">
      {/* <NewTodo />
    */}   <form className="todolistcontainer--form">
        {/*         {alert(`${lista}`)} */}
        {/*  //NO ME FUNCIONA EN EL MAP Y NO SE PQ */}

        {list.map((todoitem) => {
          return (
            <div key={todoitem.id} className="todocomponentcontainer">
              <TodoContainerListComponent itemtodo={todoitem} />
            </div>
          );
        })}
      </form>
      <BottomList />
    </div>
  );
};

export default TodoContainerList;
