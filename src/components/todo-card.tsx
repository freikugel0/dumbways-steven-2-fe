import type { TodoProgress, TodoType } from "@/types/todo";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useTodo } from "@/hooks/useTodo";
import TextAreaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const TodoCard = ({ todo }: { todo: TodoType }) => {
  const { remove, edit, loading } = useTodo();
  console.log(loading);

  const [title, setTitle] = useState(todo.title);
  const [desc, setDesc] = useState(todo.desc);
  const [progress, setProgress] = useState<TodoProgress>(todo.progress);
  const [err, setErr] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");

    const titleSave = title.trim();
    const descSave = desc.trim();

    if (!titleSave)
      return setErr("Really? You can't do something with an empty title...");
    edit(todo.id, titleSave, descSave, progress);
  };

  return (
    <form onSubmit={handleSubmit} className="h-fit">
      <Card className="relative group mb-4">
        <button
          type="button"
          className="absolute -top-2 -right-2 hidden rounded-full p-1 border hover:border-none bg-white text-black hover:text-white shadow group-hover:block hover:bg-red-600 hover:cursor-pointer"
          aria-label="Delete todo"
          onClick={() => remove(todo.id)}
        >
          <X className="h-4 w-4" />
        </button>
        <CardHeader>
          <CardTitle>
            <input
              className="outline-none"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What do you need to do?"
            />
          </CardTitle>
          <CardDescription>
            {new Date(todo.id).toLocaleDateString()}
          </CardDescription>
          <CardAction>
            <div className="flex items-center gap-2">
              <Select
                value={progress}
                onValueChange={(e) => setProgress(e as TodoProgress)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a progress" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Progress</SelectLabel>
                    <SelectItem value="not_started">Not Started</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="on_hold">On Hold</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardAction>
        </CardHeader>
        <CardContent>
          <TextAreaAutosize
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full outline-none resize-none text-sm"
            placeholder="e.g., Remember to buy milk, eggs, and bread"
          ></TextAreaAutosize>
        </CardContent>
        {(title !== todo.title ||
          desc !== todo.desc ||
          progress !== todo.progress) && (
          <CardFooter>
            <div className="flex flex-col items-center gap-2 w-full">
              {err && <p className="text-red-500 text-sm">{err}</p>}
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </form>
  );
};
