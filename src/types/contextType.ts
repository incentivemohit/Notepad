export type Todo = {
  id: string;
  todoName: string;
  isSelected: boolean;
  isCompleted:boolean
};

export type Note = {
  id: string;
  title: string;
  timeDate:string ;
  desc: string;
  isSelected: boolean;
};

export interface ContextType {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  getNotes: () => void;
  saveNote: (note: Note) => void;
  updateNote: (id: string) => void;

  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  status: boolean;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
  getTodos: () => void;
  saveTodo: (todo: Todo) => void;
  updateTodo: (id: string) => void;
}
