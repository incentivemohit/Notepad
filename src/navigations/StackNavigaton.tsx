import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNavigation from "./BottomNavigation";
import Search from "../components/Notes/NotesSearch";
import {
  RootStackParamList,
} from "../types/navigationType";
import AddNote from "../components/Notes/AddNote";
import AddTodo from "../components/Todos/AddTodo";
import DeleteTodo from "../components/Todos/DeleteTodo";
import NotesSearch from "../components/Notes/NotesSearch";
import TodoSearch from "../components/Todos/TodoSearch";
import DeleteNote from "../components/Notes/DeleteNote";

const Stack = createStackNavigator<RootStackParamList>();

export default function StackNavigaton() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={BottomNavigation} />
      <Stack.Screen name="NotesSearch" component={NotesSearch} />
      <Stack.Screen name="TodoSearch" component={TodoSearch} />
      <Stack.Screen
        name="AddNote"
        options={{
          headerShown: false,
          
        }}
        component={AddNote}
      /> 
       <Stack.Screen name="DeleteNote" component={DeleteNote} />
      <Stack.Screen name="AddTodo" component={AddTodo} />
      <Stack.Screen name="DeleteTodo" component={DeleteTodo} />
    </Stack.Navigator>
  );
}
