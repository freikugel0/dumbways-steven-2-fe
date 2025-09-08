export type TodoProgress =
  | "not_started"
  | "in_progress"
  | "completed"
  | "on_hold";

export type TodoType = {
  id: number;
  title: string;
  desc: string;
  progress: TodoProgress;
};
