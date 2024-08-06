import { useEffect } from "react";
import { useUserContext } from "../providers/UserProvider";

const BottomList = () => {
  const {
    handleActive,
    handleCompletedList,
    handleClearCompleted,
    setIndex,
    getNumberItemsCompleted,
    todoList,
    todoActivedList,
    subiraFirebase,
    idListFirebase,
  } = useUserContext();
  let itemleft = 0;

  const handleItemLeft = () => {
    return (itemleft = todoActivedList.length);
  };
  useEffect(() => {
    //EVITAMOS BUCLE Y NECESITAMOS ACTIVAR LA FUNCION PARA SACAR VALOR DE ITEMS PDTES
    //   handleActive();  ->>>no sale items pdtes si desactivamos
    getNumberItemsCompleted();
    idListFirebase && subiraFirebase();
  }, [todoList]);

  return (
    <div className="bottomContainer">
      <div className="bottomlist">
        <p className="bottomlist--left josefin--400">
          {handleItemLeft()} items left
        </p>
        <div className="bottomlist--center">
          <p
            className="bottomlist--center--all josefin--700"
            onClick={() => setIndex(0)}
          >
            All
          </p>
          <p
            className="bottomlist--center--active josefin--700"
            onClick={handleActive}
          >
            Active
          </p>
          <p
            className="bottomlist--center--completed josefin--700"
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

      <div className="bottomlist--center--mobile">
        <p
          className="bottomlist--center--all josefin--700"
          onClick={() => setIndex(0)}
        >
          All
        </p>
        <p
          className="bottomlist--center--active josefin--700"
          onClick={handleActive}
        >
          Active
        </p>
        <p
          className="bottomlist--center--completed josefin--700"
          onClick={handleCompletedList}
        >
          Completed
        </p>
      </div>
    </div>
  );
};

export default BottomList;
