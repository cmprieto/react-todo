import React from 'react'
import TodoContainerList from './TodoContainerList';
import NewTodo from './NewTodo';

const TodoContainer = () => {
  return (
    <div className='todocontainer'><h1 className='josefin--700'>To Do List</h1>
        <NewTodo/>
        <TodoContainerList/>
    </div>
  )
}

export default TodoContainer;