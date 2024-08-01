import React from "react";
import TodoContainerList from "./TodoContainerList";
import NewTodo from "./NewTodo";
import Footer from "./Footer";

const TodoContainer = () => {
  
  return (
    <div className="todocontainer">
      <div className="todocontainer--h1"><h1 className="josefin--700">To Do List</h1></div>
      <NewTodo />
      <TodoContainerList />
      <Footer/>
    </div>
  );
};

export default TodoContainer;
