import { useState } from "react";
import type { Todo } from "./types/todo";
import { Item } from "./components/item";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const toggleCompleted = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex flex-col p-2 gap-4">
        <h1 className="text-2xl font-semibold">Todo</h1>
        <div className="flex flex-col items-start gap-2">
          <input
            type="text"
            placeholder="Title"
            className="border p-2 rounded-lg outline-none"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="border p-2 rounded-lg outline-none"
            placeholder="Description"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <button
            type="button"
            className="border-b hover:cursor-pointer hover:text-gray-500"
            onClick={() =>
              setTodos((prev) => [
                ...prev,
                {
                  id: prev.length,
                  title,
                  desc,
                  completed: false,
                },
              ])
            }
          >
            Create
          </button>
        </div>
      </div>
      {todos && (
        <div>
          {todos.map((todo) => (
            <Item key={todo.id} todo={todo} toggleCompleted={toggleCompleted} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
