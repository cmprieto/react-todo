import React from 'react'
import TodoContainerList from './TodoContainerList';

const TodoContainer = () => {
  return (
    <div className='todocontainer'><h1>To Do List</h1>
        <TodoContainerList/>
    </div>
  )
}

export default TodoContainer;