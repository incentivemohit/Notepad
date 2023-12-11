import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../types/navigationType";
import { Checkbox } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type SearchProps = {
  searchResults: any;
  category: string;
};

export default function SearchResults({
  searchResults,
  category,
}: SearchProps) {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "DeleteScreen">>();
  return (
    <>
      {searchResults != null &&
        (category === "notes" ? (
          <FlatList
            data={searchResults}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onLongPress={() =>
                    navigation.navigate("DeleteScreen", {
                      deleteParams: "notes",
                    })
                  }
                  className="bg-gray-300 px-4 py-3 mb-2 rounded-xl mx-2"
                >
                  <Text className="text-lg text-ellipsis overflow-hidden">
                    {item.title}
                  </Text>
                  <Text className="py-1 text-xs ">{item.timeDate}</Text>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <FlatList
            data={searchResults}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onLongPress={() =>
                    navigation.navigate("DeleteScreen", {
                      deleteParams: "todos",
                    })
                  }
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
        ))}
    </>
  );
}
