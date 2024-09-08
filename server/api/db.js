const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const getTodos = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM todo');
    return result.rows;
  } catch (error) {
    throw new Error(`Error fetching todos: ${error.message}`);
  } finally {
    client.release();
  }
};

const createTodo = async (description) => {
  const client = await pool.connect();
  try {
    const date = new Date().toISOString().split('T')[0];
    const result = await client.query(
      'INSERT INTO todo (description, date) VALUES ($1, $2) RETURNING *',
      [description, date]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error creating todo: ${error.message}`);
  } finally {
    client.release();
  }
};

const updateTodo = async (todoId, description) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'UPDATE todo SET description = $1 WHERE todo_id = $2',
      [description, todoId]
    );
    return result.rowCount > 0;
  } catch (error) {
    throw new Error(`Error updating todo: ${error.message}`);
  } finally {
    client.release();
  }
};

const deleteTodo = async (todoId) => {
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM todo WHERE todo_id = $1', [
      todoId,
    ]);
    return result.rowCount > 0;
  } catch (error) {
    throw new Error(`Error deleting todo: ${error.message}`);
  } finally {
    client.release();
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
