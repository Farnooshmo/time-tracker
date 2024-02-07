
import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from './EditTodo';
import DeleteTodo from './DeleteTodo';
import Timer from './Timer';

const ListTodos = () => {
  // duration will be change
  const duration = '60 min';
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:5001/todos');
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);

  const deleteTodo = (deletedTodoId) => {
    setTodos(todos.filter((todo) => todo.todo_id !== deletedTodoId));
  };


  return (
    <Fragment>
      <div className='list-todos'>
        {todos &&
          todos.map((todo) => (
            <div key={todo.todo_id} className='todo-item'>
              <div className='todo-description'>{todo.description}</div>
              <div className='todo-actions'>
                <div>
                  <p>{duration}</p>
                </div>
				<Timer />
                <div>
                  <EditTodo todo={todo} />
                  <DeleteTodo todoId={todo.todo_id} onDelete={deleteTodo} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default ListTodos;
