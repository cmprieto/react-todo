import {  forwardRef, useEffect} from 'react';
import iconcross from "../assets/img/icon-cross.svg";
import { useUserContext } from "../providers/UserProvider";


const TodoContainerListComponent = (
  { itemtodo, draggableProps, dragHandleProps },
  ref
) => {
  const { handleCompleted, handleDelete ,todoList,todoActivedList,todoCompletedList} = useUserContext();

  /*   const handleChecked = (e) => { */
  // console.log("checked", e.target.checked);
  /*     handleCompleted(itemtodo.id, e.target.checked); //METODO DEL CONTEXTO
    setIsChecked(e.target.checked);
  }; */

/*   useEffect(() => {
   // subiraFirebase();
  }, [todoList,todoActivedList,todoCompletedList]); */

  return (
    <div ref={ref} {...draggableProps} {...dragHandleProps}  className="todocomponentcontainer">
      <input
        type="checkbox"
        className="todocomponentcontainer--largeradio"
        // checked={isChecked}
        //    onChange={handleChecked}
        onChange={(e) => handleCompleted(itemtodo.id, e.target.checked)}
      />
      {itemtodo.completed === false ? (
        <p className="todocomponentcontainer--text"> {itemtodo.task}</p>
      ) : (
        <p className="todocomponentcontainer--text--tachado">
          {" "}
          {itemtodo.task}
        </p>
      )}{" "}
      <img
        src={iconcross}
        className="todocomponentcontainer--cross"
        onClick={() => handleDelete(itemtodo.id)}
        alt="icon cross"
      />
    </div>
  );
};

export default forwardRef(TodoContainerListComponent);
