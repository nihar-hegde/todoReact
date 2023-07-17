import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Input from "./components/Input";
import axios from "axios";
import TodoCard from "./components/TodoCard";

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos");
      setTodos(response.data.data);
    } catch (error) {
      console.log("you fucked up!", error);
    }
  };

  const handleAddTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };
  const handleDeleteTodo = async (todoId) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${todoId}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
    } catch (error) {
      console.log("Error occurred while deleting todo:", error);
    }
  };
  return (
    <>
      <Input onAddTodo={handleAddTodo}></Input>
      {todos.map((todo) => (
        <TodoCard
          key={todo._id}
          title={todo.title}
          description={todo.description}
          onDelete={() => handleDeleteTodo(todo._id)}
        />
      ))}
    </>
  );
}

export default App;
