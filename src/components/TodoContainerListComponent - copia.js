import { Fragment, useState } from "react";
import iconcross from "../assets/img/icon-cross.svg";
import { useUserContext } from "../providers/UserProvider";
//import iconcheck from "..assets/img/iconcheck";

const TodoContainerListComponent = ({ itemtodo }) => {
  const { handleCompleted, handleDelete } = useUserContext();
  const [isChecked, setIsChecked] = useState(false);

/*   const handleChecked = (e) => { */
   // console.log("checked", e.target.checked);
/*     handleCompleted(itemtodo.id, e.target.checked); //METODO DEL CONTEXTO
    setIsChecked(e.target.checked);
  }; */

  return (
    <Fragment>
      <input
        type="checkbox"
        className="todocomponentcontainer--largeradio"
      // checked={isChecked}
    //    onChange={handleChecked}
        onChange={(e)=>handleCompleted(itemtodo.id, e.target.checked)}
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
    </Fragment>
  );
};

export default TodoContainerListComponent;
