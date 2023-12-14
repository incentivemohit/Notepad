import React, { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Todo, TodoContextType } from "../types/contextType";

export const TodoContext = createContext<TodoContextType | null>(null);

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

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
      x.unshift(item);
      await AsyncStorage.setItem("todos", JSON.stringify(x));
      setLoading(!loading);
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

  return (
    <TodoContext.Provider
      value={{
        loading,
        setLoading,
        todos,
        setTodos,
        getTodos,
        saveTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
