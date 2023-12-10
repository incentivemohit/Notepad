import React, { createContext } from "react";
import { ContextType, Note, Todo } from "./types/contextType";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Context = createContext<ContextType | null>(null);

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [status, setStatus] = React.useState<boolean>(false);

  const getNotes = async () => {
    try {
      const results = await AsyncStorage.getItem("notes");
      if (results !== null) {
        setNotes(JSON.parse(results));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveNote = async (item: Note) => {
    try {
      let x = [];
      const results = await AsyncStorage.getItem("notes");
      if (results != null) {
        const prevData: Note[] = JSON.parse(results);
        prevData.forEach((element) => {
          x.push(element);
        });
      }
      x.push(item);
      await AsyncStorage.setItem("notes", JSON.stringify(x));
      setStatus(!status);
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = () => {
    console.log("update");
  };

  // To-dos related functions

  const saveTodo = async (item: Todo) => {
    try {
      let x = [];
      const results = await AsyncStorage.getItem("todos");
      if (results != null) {
        const prevData: Todo[] = JSON.parse(results);
        prevData.forEach((element) => {
          x.push(element);
        });
      }
      x.push(item);
      await AsyncStorage.setItem("todos", JSON.stringify(x));
      setStatus(!status);
    } catch (error) {
      console.log(error);
    }
  };

  const getTodos = async () => {
    try {
      const results = await AsyncStorage.getItem("todos");
      if (results !== null) {
        setTodos(JSON.parse(results));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = () => {
    console.log("update");
  };

  return (
    <Context.Provider
      value={{
        notes,
        setNotes,
        getNotes,
        saveNote,
        updateNote,
        todos,
        setTodos,
        status,
        setStatus,
        getTodos,
        saveTodo,
        updateTodo,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default TodoProvider;
