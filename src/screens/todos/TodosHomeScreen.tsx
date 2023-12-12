import { PlusIcon } from "react-native-heroicons/solid";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import React, { useEffect, useState } from "react";
import { Context } from "../../Context";
import { useIsFocused } from "@react-navigation/native";
import { ContextType } from "../../types/contextType";
import { IconSize, headerTitleSize } from "../../utility";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs";
import { RootStackParamList } from "../../types/navigationType";
import AddTodo from "./AddTodo";
import TodoComponent from "../../components/Todos/TodoComponent";

type TodosHomeProps = MaterialBottomTabNavigationProp<RootStackParamList>;

export default function TodosHomeScreen({
  navigation,
}: {
  navigation: TodosHomeProps;
}) {
  const [visible, setVisible] = useState(false);
  const { todos, loading, getTodos, setTodos } = React.useContext(
    Context
  ) as ContextType;

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleCompleteTodo = async (id: string, type: boolean) => {
    const newArray = todos.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: !type };
      } else {
        return item;
      }
    });

    setTodos(newArray);
    await AsyncStorage.setItem("todos", JSON.stringify(newArray));
  };

  useEffect(() => {
    getTodos();
  }, [loading]);
  return (
    <>
      <SafeAreaView className="flex-1 relative">
        <View className=" flex-row items-center justify-between py-3">
          <Text style={{ fontSize: hp(headerTitleSize) }} className="pl-4">
            Todos
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          className="flex-row items-center gap-x-2 bg-gray-300 rounded-full mx-2 py-2.5 pl-1"
          onPress={() =>
            navigation.navigate("SearchScreen", {
              searchParams: "to-dos",
            })
          }
        >
          <MagnifyingGlassIcon fill="black" size={hp(IconSize)} />
          <Text>Search to-dos</Text>
        </TouchableOpacity>
        <View className="flex-1 relative pt-1">
          {todos != null && (
            <FlatList
              data={todos}
              renderItem={({ item }) => {
                return (
                  <TodoComponent
                    item={item}
                    handleCompleteTodo={handleCompleteTodo}
                  />
                );
              }}
            />
          )}

          <View className="bottom-0 absolute w-full flex-row justify-center">
            <TouchableOpacity
              activeOpacity={1}
              onPress={showModal}
              className="flex-row justify-center items-center bg-green-500 rounded-full w-14 h-14 "
            >
              <PlusIcon fill="white" size={hp(IconSize + 2)} />
            </TouchableOpacity>
          </View>
        </View>

        <AddTodo visible={visible} hideModal={hideModal} />
      </SafeAreaView>
    </>
  );
}
