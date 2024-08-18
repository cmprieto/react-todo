import TodoContainerList from "./TodoContainerList";
import NewTodo from "./NewTodo";
import Footer from "./Footer";
import { useUserContext } from "../providers/UserProvider";
import UserControl from "./UserControl";

const TodoContainer = () => {
  const { setTodoActivedList, setTodoCompletedList, setTodoList } =
    useUserContext();

  const handleDeleteTasks = () => {
    setTodoList([]);
    setTodoCompletedList([]);
    setTodoActivedList([]);
  };

  return (
    <div className="todocontainer">
      <div className="todocontainer--header">
        <h1 className="josefin--700">To Do List</h1>
        <UserControl />
      </div>
      <NewTodo />
      <TodoContainerList />
      <Footer />
    </div>
  );
};

export default TodoContainer;
