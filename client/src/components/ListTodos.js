import React, { Fragment , useEffect, useState} from "react";
import StartTimer from "./StartTimer";
import StopTimer from "./StopTimer";
import EditTodo from "./EditTodo";
import DeleteTodo from "./DeleteTodo";

const ListTodos = () => {
//duration will be change
const duration = "60 min"

const [todos, setTodos] = useState([]);

const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5001/todos"); 
      const jsonData = await response.json();
      setTodos(jsonData)
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);

  const deleteTodo = (deletedTodoId) => {
    setTodos(todos.filter(todo => todo.todo_id !== deletedTodoId));
  };

  const handleStart = (todoId) => {
    // Implement logic to handle the start event for the specific todo
    console.log(`Start timer for todo with ID ${todoId}`);
  };

  const handleStop = (todoId) => {
    // Implement logic to handle the stop event for the specific todo
    console.log(`Stop timer for todo with ID ${todoId}`);
  };
 
  return (
    <Fragment>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Duration</th>
            <th>Edit Todo</th>
            <th>Delete Todo</th>
            <th>Start </th>
            <th>Stop</th>
            </tr>
        </thead>
        <tbody>
          {todos && todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>{duration}</td>
              <td>< EditTodo todo={todo}/></td>
              <td><DeleteTodo
                  todoId={todo.todo_id}
                  onDelete={deleteTodo}
                /></td>
              <td><StartTimer todoId={todo.todo_id} onStart={() => handleStart(todo.todo_id)} /></td>
              <td><StopTimer todoId={todo.todo_id} onStop={() => handleStop(todo.todo_id)} /></td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default ListTodos;
