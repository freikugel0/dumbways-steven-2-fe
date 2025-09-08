import Spinner from "@/components/loading";
import { TodoCard } from "@/components/todo-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTodo } from "@/hooks/useTodo";
import { useState } from "react";
import Masonry from "react-masonry-css";

export const Todo = () => {
  const { todos, add, loading } = useTodo();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");

    const titleSave = title.trim();
    const descSave = desc.trim();

    if (!titleSave)
      return setErr("Really? You can't start todo with an empty title...");
    add(titleSave, descSave);

    setTitle("");
    setDesc("");
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Add Todo</CardTitle>
            <CardDescription>
              Add notes or extra details to help you complete this task.
            </CardDescription>
            <CardAction>
              <div className="flex items-center gap-2">
                {loading && <Spinner />}
                <Button type="submit" variant={"ghost"}>
                  Save
                </Button>
              </div>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {err && <p className="text-red-500 text-sm">{err}</p>}
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="What do you need to do?"
              />
              <Textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="e.g., Remember to buy milk, eggs, and bread"
              />
            </div>
          </CardContent>
        </Card>
      </form>
      {todos.length > 0 ? (
        <Masonry
          breakpointCols={{
            default: 3,
            1024: 2,
            640: 1,
          }}
          className="flex gap-4"
          columnClassName="bg-clip-padding"
        >
          {todos.map((t) => (
            <TodoCard key={t.id} todo={t} />
          ))}
        </Masonry>
      ) : (
        <div className="flex flex-col items-center gap-2 w-full">
          <h1 className="text-2xl font-semibold">Nothing to do here</h1>
          <p>¯\_(⊙︿⊙)_/¯</p>
        </div>
      )}
    </div>
  );
};
