// import React, { Fragment, useEffect, useState } from 'react'
// import StartTimer from './StartTimer'
// import StopTimer from './StopTimer'
// import EditTodo from './EditTodo'
// import DeleteTodo from './DeleteTodo'

// const ListTodos = () => {
// 	//duration will be change
// 	const duration = '60 min'
// 	const [todos, setTodos] = useState([])

// 	const getTodos = async () => {
// 		try {
// 			const response = await fetch('http://localhost:5001/todos')
// 			const jsonData = await response.json()
// 			setTodos(jsonData)
// 		} catch (err) {
// 			console.error(err.message)
// 		}
// 	}

// 	useEffect(() => {
// 		getTodos()
// 	}, [])

// 	console.log(todos)

// 	const deleteTodo = (deletedTodoId) => {
// 		setTodos(todos.filter((todo) => todo.todo_id !== deletedTodoId))
// 	}

// 	return (
// 		<Fragment>
// 			<div className='list-todos'>
// 				{todos &&
// 					todos.map((todo) => (
// 						<div key={todo.todo_id} className='todo-item'>
// 							<div className='todo-description'>{todo.description}</div>
// 							<div className='todo-actions'>
// 								<div>
// 									<p>{duration}</p>
// 								</div>
// 								<div>
// 									<StartTimer />
// 									<StopTimer />
// 								</div>
// 								<div>
// 									<EditTodo todo={todo} />
// 									<DeleteTodo todoId={todo.todo_id} onDelete={deleteTodo} />
// 								</div>
// 							</div>
// 						</div>
// 					))}
// 			</div>
// 		</Fragment>
// 	)
// }

// export default ListTodos





import React, { Fragment, useEffect, useState } from 'react';
import StartTimer from './StartTimer';
import StopTimer from './StopTimer';
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

//   const handleStart = (todoId) => {
//     // Implement logic to handle the start event for the specific todo
//     console.log(`Start timer for todo with ID ${todoId}`);
//   };

//   const handleStop = (todoId) => {
//     // Implement logic to handle the stop event for the specific todo
//     console.log(`Stop timer for todo with ID ${todoId}`);
//   };

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
                {/* <div>
                  <StartTimer todoId={todo.todo_id} onStart={() => handleStart(todo.todo_id)} />
                  <StopTimer todoId={todo.todo_id} onStop={() => handleStop(todo.todo_id)} />
                </div> */}
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
