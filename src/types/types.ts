export interface Task {
  id: string;
  file?: string | File;
  title: string;
  text: string;
  status: string;
}

export interface TaskListProps {
  tasks: Task[];
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

export interface TasksItemProps {
  task: Task;
}
