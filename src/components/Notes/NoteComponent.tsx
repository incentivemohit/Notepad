import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../types/navigationType";
import { Note } from "../../types/contextType";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

export default function NoteComponent({ item }: { item: Note }) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("EditNote", {
            id: item.id,
          })
        }
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
    </>
  );
}
