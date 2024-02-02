import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState(todo.description);

  // Edit description function
  const updateDescription = async () => {
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:5001/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update todo");
      }
      closeModal();
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Fragment>
      {!showModal && <button onClick={openModal}>Edit</button>}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div>
              <input
                type="text"
                className="form"
                placeholder="Edit your todo here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button onClick={updateDescription}>Save</button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default EditTodo;
