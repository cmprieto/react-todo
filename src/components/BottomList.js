import { useEffect } from "react";
import { useUserContext } from "../providers/UserProvider";

const BottomList = () => {
  const {
    handleActive,
    handleCompletedList,
    todoActivedList,
    todoList,
    handleClearCompleted,
    setIndex,getNumberItemsCompleted
  } = useUserContext();
  let itemleft = 0;
  const handleItemLeft = () => {
    return (itemleft = todoActivedList.length);
  };
  useEffect(() => {
    //EVITAMOS BUCLE Y NECESITAMOS ACTIVAR LA FUNCION PARA SACAR VALOR DE ITEMS PDTES
    //   handleActive();  ->>>no sale items pdtes si desactivamos
    getNumberItemsCompleted();
  }, [todoList]);

  return (
    <div className="bottomlist">
      <p className="bottomlist--left josefin--400">
        {handleItemLeft()} items left
      </p>
      <div className="bottomlist--center">
        <p
          className="bottomlist--center--all josefin--400"
          onClick={() => setIndex(0)}
        >
          All
        </p>
        <p
          className="bottomlist--center--active josefin--400"
          onClick={handleActive}
        >
          Active
        </p>
        <p
          className="bottomlist--center--completed josefin--400"
          onClick={handleCompletedList}
        >
          Completed
        </p>
      </div>

      <p
        className="bottomlist--clear josefin--400 "
        onClick={handleClearCompleted}
      >
        Clear completed
      </p>
    </div>
  );
};

export default BottomList;
