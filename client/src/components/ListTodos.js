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
              <td><StartTimer /></td>
              <td><StopTimer /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default ListTodos;
