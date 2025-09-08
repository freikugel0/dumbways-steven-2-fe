import type { TodoType, TodoProgress } from "@/types/todo";
import { createContext, useState } from "react";

export type TodoContextType = {
  todos: TodoType[];
  add: (title: string, desc?: string) => void;
  remove: (id: number) => void;
  edit: (
    id: number,
    title?: string,
    desc?: string,
    progress?: TodoProgress,
  ) => void;
  loading: boolean;
};

export type TodoStorageType = Pick<TodoContextType, "todos">;

export const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const key = "todo";

  const [data, setData] = useState<TodoStorageType>(() => {
    try {
      const prev = localStorage.getItem(key);
      return prev ? JSON.parse(prev) : { todos: [] };
    } catch {
      return { todos: [] };
    }
  });
  const [loading, setLoading] = useState(false);

  const add = (title: string, desc?: string) => {
    const build: TodoStorageType = {
      todos: [
        {
          id: Date.now(),
          title,
          desc: desc ?? "",
          progress: "not_started",
        },
        ...data.todos,
      ],
    };

    setData(build);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      try {
        localStorage.setItem(key, JSON.stringify(build));
      } catch (err) {
        console.error("Add failed:", err);
        setData(data);
      }
    }, 3000);
  };

  const remove = (id: number) => {
    const find = data.todos.find((t) => t.id === id);
    if (!find) return console.error(`Todo id ${id} not found`);

    const filter = data.todos.filter((t) => t.id !== id);
    const build: TodoStorageType = { todos: filter };

    setData(build);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      try {
        localStorage.setItem(key, JSON.stringify(build));
      } catch (err) {
        console.error("Remove failed:", err);
        setData(data);
      }
    }, 3000);
  };

  const edit = (
    id: number,
    title?: string,
    desc?: string,
    progress?: TodoProgress,
  ) => {
    const find = data.todos.find((t) => t.id === id);
    if (!find) return console.error(`Todo id ${id} not found`);

    const build: TodoStorageType = {
      todos: data.todos.map((t) =>
        t.id === id
          ? {
              ...t,
              title: title ?? t.title,
              desc: desc ?? t.desc,
              progress: progress ?? t.progress,
            }
          : t,
      ),
    };

    setData(build);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      try {
        localStorage.setItem(key, JSON.stringify(build));
      } catch (err) {
        console.error("Edit failed:", err);
        setData(data);
      }
    }, 3000);
  };

  return (
    <TodoContext.Provider
      value={{ todos: data.todos, add, remove, edit, loading }}
    >
      {children}
    </TodoContext.Provider>
  );
};
