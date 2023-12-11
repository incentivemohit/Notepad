import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import NotesHomeScreen from "../screens/notes/NotesHomeScreen";
import TodosHomeScreen from "../screens/todos/TodosHomeScreen";
import { Bars3Icon } from "react-native-heroicons/solid";
import { PencilSquareIcon } from "react-native-heroicons/solid";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BottomTabParamList } from "../types/navigationType";
const Tab = createMaterialBottomTabNavigator<BottomTabParamList>();

export default function BottomNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="NotesHomeScreen"
        component={NotesHomeScreen}
        options={{
          tabBarIcon: () => <Bars3Icon fill="black" size={hp(3)} />,tabBarLabel:"Notes"
        }}
      />
      <Tab.Screen
        name="TodosHomeScreen"
        component={TodosHomeScreen}
        options={{
          tabBarIcon: () => <PencilSquareIcon fill="black" size={hp(3)} />,tabBarLabel:"Todos"
        }}
      />
    </Tab.Navigator>
  );
}
