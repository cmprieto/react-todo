import { Fragment,  useState } from "react";
import iconcross from "../assets/img/icon-cross.svg";
import { useUserContext } from "../providers/UserProvider";
//import iconcheck from "..assets/img/iconcheck";

const TodoContainerListComponent = ({ itemtodo }) => {
  const { handleCompleted } = useUserContext();
  const [isChecked, setIsChecked] = useState(false);
 
  const handleChecked = (e) => {
    console.log("checked", e.target.checked);
    setIsChecked(e.target.checked);
    handleCompleted(itemtodo.id, isChecked); //METODO DEL CONTEXTO
  };

  return (
    <Fragment>
      <input
        type="checkbox"
        name="todolist"
        value={itemtodo.task}
        className="todocomponentcontainer--largeradio"
        checked={isChecked}
        onChange={handleChecked}
      />
      {isChecked === false ? (
        <p className="todocomponentcontainer--text"> {itemtodo.task}</p>
      ) : (
        <p className="todocomponentcontainer--text--tachado">
          {" "}
          {itemtodo.task}
        </p>
      )}{" "}
      <img src={iconcross} className="todocomponentcontainer--cross" alt="icon cross"/>
    </Fragment>
  );
};

export default TodoContainerListComponent;
