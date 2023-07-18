export interface Task {
  id: number;
  title: string;
  state: string;
}

export interface KanbanState {
  tasks: Task[];
  draggedTask: number | null;
  tasksInOngoing: number;
  addTask: ({ title, state }: { title: string; state: string }) => void;
  deleteTask: (id: number) => void;
  setDraggedTask: (id: number | null) => void;
  moveTask: (state: string) => void;
}
