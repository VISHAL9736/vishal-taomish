import { useEffect, useState } from 'react';
import { deleteTodo, getTodos } from '../services/api';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleAdd = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleUpdate = (updatedTodo) => {
    setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
  };

  return (
    <div>
      <h1>Todo App</h1>
      <AddTodo onAdd={handleAdd} />
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} onUpdate={handleUpdate} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;