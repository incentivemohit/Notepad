import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { RootStackParamList } from "../types/navigationType";
import BottomNavigation from "./BottomNavigation";
import SearchScreen from "../screens/misc/SearchScreen";
import AddNote from "../screens/notes/AddNote";
import DeleteScreen from "../screens/misc/DeleteScreen";
import AddTodo from "../screens/todos/AddTodo";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={BottomNavigation} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen
        name="AddNote"
        options={{
          headerShown: false,
        }}
        component={AddNote}
      />
      <Stack.Screen name="DeleteScreen" component={DeleteScreen} />
      <Stack.Screen
        name="AddTodo"
        options={{
          headerShown: false,
        }}
        component={AddTodo}
      />
    
    </Stack.Navigator>
  );
}
