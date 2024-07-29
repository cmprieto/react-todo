import TodoContainerListComponent from "./TodoContainerListComponent";
import NewTodo from "./NewTodo";
import { useUserContext } from "../providers/UserProvider";
import BottomList from "./BottomList";
import { useEffect } from "react";
const TodoContainerList = () => {
  const { todoList } = useUserContext();

useEffect(()=>{
 // alert('refresh');
},[todoList]);

  return (
    <div className="todolistcontainer">
      <NewTodo />
       <form className="todolistcontainer--form">
      {todoList.map((todoitem, i) => {
        return (
          <div key={i} className="todocomponentcontainer">
            <TodoContainerListComponent itemtodo={todoitem} />
          </div>
        );
      })}
      </form> 
      <BottomList/>
    </div>
  );
};

export default TodoContainerList;
