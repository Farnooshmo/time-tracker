import React from "react";

const DeleteTodo = ({ todoId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5001/todos/${todoId}`, {
        method: "DELETE"
      });
      onDelete(todoId); // Update the state in the parent component after deletion
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <button onClick={handleDelete}>
      Delete
    </button>
  );
}

export default DeleteTodo;
