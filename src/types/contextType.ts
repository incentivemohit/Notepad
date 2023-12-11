export type Todo = {
  id: string;
  todoName: string;
  isSelected: boolean;
  isCompleted: boolean;
};

export type Note = {
  id: string;
  title: string;
  timeDate: string;
  desc: string;
  isSelected: boolean;
};

export interface ContextType {
  status: boolean;
  setStatus: (status: boolean) => void;
  
  notes: Note[];
  setNotes: (Note: Note[]) => void;
  getNotes: () => void;
  saveNote: (note: Note) => void;
  updateNote: (id: string) => void;

  todos: Todo[];
  setTodos: (Todo: Todo[]) => void;
  getTodos: () => void;
  saveTodo: (todo: Todo) => void;
  updateTodo: (id: string) => void;
}
