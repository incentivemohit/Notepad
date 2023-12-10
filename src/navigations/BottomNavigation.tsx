import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import NotesHomeScreen from "../screens/notes/NotesHomeScreen";
import TodosHomeScreen from "../screens/todos/TodosHomeScreen";
import { Bars3Icon } from "react-native-heroicons/solid";
import { PencilSquareIcon } from "react-native-heroicons/solid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RootBottomTabParamList } from "../types/navigationType";
const Tab = createMaterialBottomTabNavigator<RootBottomTabParamList>();

export default function BottomNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Notes"
        component={NotesHomeScreen}
        options={{
          tabBarIcon: () => <Bars3Icon fill="black" size={hp(3)} />,
        }}
      />
      <Tab.Screen
        name="Todos"
        component={TodosHomeScreen}
        options={{
          tabBarIcon: () => <PencilSquareIcon fill="black" size={hp(3)} />,
        }}
      />
    </Tab.Navigator>
  );
}
