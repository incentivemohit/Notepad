import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Checkbox } from "react-native-paper";
import React, { useState } from "react";
import { TrashIcon } from "react-native-heroicons/solid";
import { Context } from "../../Context";
import { SafeAreaView } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { XMarkIcon } from "react-native-heroicons/solid";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContextType } from "../../types/contextType";
import { RootStackParamList } from "../../types/navigationType";

var items = 0;
export default function DeleteScreen() {
  const { notes, setNotes, todos, setTodos, setStatus, status } =
    React.useContext(Context) as ContextType;
  const [count, setCount] = useState<number>(items);

  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "DeleteScreen">>();
  const category = route.params.deleteParams;

  const removeSelectedItems = async (type: string) => {
    if (type === "notes") {
      const newArray = notes.filter((item) => {
        if (item.isSelected !== true) {
          return item;
        }
      });
      await AsyncStorage.setItem("notes", JSON.stringify(newArray));
    } else {
      const newArray = todos.filter((item) => {
        if (item.isSelected !== true) {
          return item;
        }
      });
      await AsyncStorage.setItem("todos", JSON.stringify(newArray));
    }
    navigation.goBack();
  };

  const selectAllItems = (type: string) => {
    if (type === "notes") {
      const newArray = notes.map((item) => {
        return { ...item, isSelected: true };
      });

      setNotes(newArray);
    } else {
      const newArray = todos.map((item) => {
        return { ...item, isSelected: true };
      });

      setTodos(newArray);
    }
  };

  const handleSelectedItem = (id: string, type: boolean, category: string) => {
    if (category === "notes") {
      const newArray = notes.map((item) => {
        if (item.id === id) {
          if (type === false) {
            setCount((value) => value + 1);
          } else {
            setCount((value) => value - 1);
          }

          return { ...item, isSelected: !type };
        } else {
          return item;
        }
      });

      setNotes(newArray);
    } else {
      const newArray = todos.map((item) => {
        if (item.id === id) {
          if (type === false) {
            setCount((value) => value + 1);
          } else {
            setCount((value) => value - 1);
          }

          return { ...item, isSelected: !type };
        } else {
          return item;
        }
      });

      setTodos(newArray);
    }
  };

  return (
    <>
      <SafeAreaView className="flex-1">
        <View className="flex-row items-center justify-between p-4">
          <View className="bg-gray-300 rounded-full p-1">
            <XMarkIcon
              fill="black"
              size={hp(3)}
              onPress={() => navigation.goBack()}
            />
          </View>

          <Text className="text-lg">{count} items selected</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            className="bg-gray-300 px-2 py-1 rounded-xl"
            onPress={() => selectAllItems(category)}
          >
            <Text className="text-md">Select All</Text>
          </TouchableOpacity>
        </View>
        <View className="w-full pt-2  flex-1">
          {category === "notes" ? (
            <FlatList
              data={notes}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      handleSelectedItem(item.id, item.isSelected, category)
                    }
                    activeOpacity={1}
                    className="bg-gray-300 p-3 mb-2 rounded-xl mx-2 flex-row items-center justify-between"
                  >
                    <Text className="text-lg text-ellipsis overflow-hidden">
                      {item.title}
                    </Text>
                    <Text className="py-1 text-xs ">{item.timeDate}</Text>
                    <Checkbox
                      status={item.isSelected ? "checked" : "unchecked"}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <FlatList
              data={todos}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      handleSelectedItem(item.id, item.isSelected, category)
                    }
                    activeOpacity={1}
                    className="bg-gray-300 p-3 mb-2 rounded-xl mx-2 flex-row items-center justify-between"
                  >
                    <Text
                      className="text-lg text-ellipsis overflow-hidden"
                      style={{
                        textDecorationLine: item.isCompleted
                          ? "line-through"
                          : "none",
                        height: hp(3),
                      }}
                    >
                      {item.todoName}
                    </Text>
                    <Checkbox
                      status={item.isSelected ? "checked" : "unchecked"}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          )}

          <TouchableOpacity
            className="flex-row justify-center w-full py-3 bg-blue-700 "
            onPress={() => removeSelectedItems(category)}
          >
            <TrashIcon fill="white" size={hp(3)} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
