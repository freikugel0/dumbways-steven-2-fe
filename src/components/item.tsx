import type { Todo } from "../types/todo";

type ItemProps = {
  todo: Todo;
  toggleCompleted: (id: number) => void;
};

export const Item = ({ todo, toggleCompleted }: ItemProps) => {
  return (
    <div className={`flex gap-2 ${todo.completed && "line-through"}`}>
      <input type="checkbox" onChange={() => toggleCompleted(todo.id)} />
      <div className="flex flex-col gap-1">
        <h1>{todo.title}</h1>
        <p>{todo.desc}</p>
      </div>
    </div>
  );
};
