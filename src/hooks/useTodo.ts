import { TodoContext } from "@/contexts/Todo";
import { useContext } from "react";

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo() must be used within an TodoProvider");
  }
  return context;
};
