"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  async function fetchTodos() {
    const response = await fetch("api/todos");
    const data = await response.json();
    setTodos(data);
  }

  async function addTodo(text) {
    const response = await fetch("api/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: text }),
    });
    const data = await response.json();
    setTodos((prevTodos) => [...prevTodos, data]);
    setInputValue("");
  }

  async function markTodoAsCompleted(id) {
    const response = await fetch(`api/todos/${id}`, {
      method: "PUT",
    });
    const data = await response.json();
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? data : todo))
    );
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="ml-2">
      <h1 className="text-5xl font-bold my-6">The project App</h1>
      <div className="my-3">
        <Image src="/api/image" alt="Random Image" width={400} height={400} />
      </div>
      <div className="text-lg my-3">
        <div className="flex items-center space-x-2 my-4">
          <input
            type="text"
            placeholder="New todo"
            maxLength={140}
            className="border-2 px-2 py-1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="bg-blue-400 hover:bg-blue-500 text-white px-2 py-1"
            onClick={() => addTodo(inputValue)}
          >
            Create Todo
          </button>
        </div>
        <div className="text-2xl font-extrabold my-3">Todos</div>
        <ul className="list-disc list-inside ml-5">
          {todos
            .sort((a, b) => a.id - b.id)
            .filter((todo) => !todo.completed)
            .map((todo, index) => (
              <li key={index} className="text-lg my-1">
                {todo.task}
                {
                  <button
                    className="bg-blue-400 hover:bg-blue-500 text-white p-1 ml-4 text-sm"
                    onClick={() => markTodoAsCompleted(todo.id)}
                  >
                    Mark as Completed
                  </button>
                }
              </li>
            ))}
        </ul>
        <div className="text-2xl font-extrabold my-3">Completed Todos</div>
        <ul className="list-disc list-inside ml-5">
          {todos
            .sort((a, b) => a.id - b.id)
            .filter((todo) => todo.completed)
            .map((todo, index) => (
              <li key={index} className="text-lg my-1">
                {todo.task}
              </li>
            ))}
        </ul>
      </div>
      <div className="text-lg my-3">DevOps with Kubernetes 2025</div>
    </div>
  );
}
