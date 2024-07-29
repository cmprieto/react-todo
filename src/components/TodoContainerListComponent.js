import { Fragment, useState } from "react";
import iconcross from "../assets/img/icon-cross.svg";

const TodoContainerListComponent = ({ itemtodo }) => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <Fragment>
      <input type="radio" name="todolist" value={itemtodo} className="todocomponentcontainer--largeradio"/>
     <p className="todocomponentcontainer--text"> {itemtodo}</p>{" "}
      <img
        src={iconcross}
        className="todocomponentcontainer--cross"
      />
    </Fragment>
  );
};

export default TodoContainerListComponent;
