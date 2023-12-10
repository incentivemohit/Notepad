import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Checkbox } from "react-native-paper";
import React, { useState } from "react";
import { TrashIcon } from "react-native-heroicons/solid";
import { Context } from "../../Context";
import { SafeAreaView } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { XMarkIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContextType } from "../../types/contextType";

var items = 0;
export default function DeleteNote() {
  const { notes, setNotes } = React.useContext(Context) as ContextType;
  const [count, setCount] = useState<number>(items);

  const navigation = useNavigation();

  const removeSelectedItems = async () => {
    const newArray = notes.filter((item) => {
      if (item.isSelected !== true) {
        return item;
      }
    });
    await AsyncStorage.setItem("notes", JSON.stringify(newArray));
    navigation.goBack();
  };

  const selectAllItems = () => {
    const newArray = notes.map((item) => {
      return { ...item, isSelected: true };
    });

    setNotes(newArray);
  };

  const handleSelectedItem = (id: string, type: boolean) => {
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
            onPress={selectAllItems}
          >
            <Text className="text-md">Select All</Text>
          </TouchableOpacity>
        </View>
        <View className="w-full pt-2  flex-1">
          {notes && (
            <FlatList
              data={notes}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => handleSelectedItem(item.id, item.isSelected)}
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
          )}

          <TouchableOpacity
            className="flex-row justify-center w-full py-3 bg-blue-700 "
            onPress={removeSelectedItems}
          >
            <TrashIcon fill="white" size={hp(3)} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
