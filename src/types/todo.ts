export type TodoItem = {
  id: string;
  title: string;
  completed: boolean;
  order?: number;
  createdAt?: string;
};

export type Section = "active" | "completed";
