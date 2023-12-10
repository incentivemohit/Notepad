import React, { useContext, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { Context } from "../../Context";
import { TouchableOpacity } from "react-native";
import { Checkbox } from "react-native-paper";
import { IconSize } from "../../utility";

export default function TodoSearch() {
  const navigation = useNavigation();
  const { todos } = useContext(Context);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchTodoItems = () => {
    const data = todos.filter((item) =>
      item.todoName.toLowerCase().trim().includes(search.toLowerCase())
    );
    setSearchResults(data);
  };

  return (
    <>
      <SafeAreaView className="flex-1 pt-2">
        <View className="flex-row items-center gap-x-2 justify-center">
          <ArrowLeftIcon
            fill="black"
            size={hp(IconSize)}
            onPress={() => navigation.goBack()}
          />
          <View
            className="flex-row items-center gap-x-2 bg-gray-300 rounded-full py-2 pl-1 "
            style={{ width: wp(85) }}
          >
            <MagnifyingGlassIcon fill="black" size={hp(IconSize)} />
            <TextInput
              type="text"
              value={search}
              returnKeyType="done"
              onKeyPress={searchTodoItems}
              onChangeText={(text) => setSearch(text)}
              placeholder="Search to-dos"
            />
          </View>
        </View>
        <View className="flex-1 pt-2">
          {searchResults != null && (
            <FlatList
              data={searchResults}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onLongPress={() => navigation.navigate("DeleteTodo")}
                    className="bg-gray-300 px-4 py-3 mb-2 rounded-xl mx-2 flex-row items-center"
                  >
                    <Checkbox status={false ? "checked" : "unchecked"} />
                    <Text className="text-lg text-ellipsis overflow-hidden">
                      {item.todoName}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
}
