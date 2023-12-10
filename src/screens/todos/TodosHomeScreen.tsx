import { PlusIcon } from "react-native-heroicons/solid";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { RootBottomTabParamList } from "../../types/navigationType";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Checkbox } from "react-native-paper";
import React, { useEffect, useState } from "react";
import AddTodo from "../../components/Todos/AddTodo";
import { Context } from "../../Context";
import { useIsFocused } from "@react-navigation/native";
import { ContextType } from "../../types/contextType";
import { IconSize, headerTitleSize } from "../../utility";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TodosHomeProps = NativeStackScreenProps<RootBottomTabParamList, "Todos">;

export default function TodosHomeScreen({ navigation }: TodosHomeProps) {
  const [visible, setVisible] = useState(false);
  const { todos, status, getTodos, setTodos } = React.useContext(
    Context
  ) as ContextType;

  const focused = useIsFocused();
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
  }, [status, focused]);
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
          onPress={() => navigation.navigate("TodoSearch")}
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
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onLongPress={() => navigation.navigate("DeleteTodo")}
                    className="bg-gray-300 px-4 py-3 mb-2 rounded-xl mx-2 flex-row items-center"
                  >
                    <Checkbox
                      status={item.isCompleted ? "checked" : "unchecked"}
                      onPress={() =>
                        handleCompleteTodo(item.id, item.isCompleted)
                      }
                    />
                    <Text
                      className="text-lg text-ellipsis overflow-hidden"
                      style={{
                        textDecorationLine: item.isCompleted
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {item.todoName}
                    </Text>
                  </TouchableOpacity>
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
