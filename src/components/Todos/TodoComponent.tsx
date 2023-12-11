import React from "react";
import { Todo } from "../../types/contextType";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigationType";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";
import { Checkbox } from "react-native-paper";

type TodoProps = {
  item: Todo;
  handleCompleteTodo: (id: string, type: boolean) => void;
};

export default function TodoComponent({ item, handleCompleteTodo }: TodoProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("EditTodo", {
            id: item.id,
          })
        }
        onLongPress={() =>
          navigation.navigate("DeleteScreen", {
            deleteParams: "todos",
          })
        }
        className="bg-gray-300 px-4 py-3 mb-2 rounded-xl mx-2 flex-row items-center"
      >
        <Checkbox
          status={item.isCompleted ? "checked" : "unchecked"}
          onPress={() => handleCompleteTodo(item.id, item.isCompleted)}
        />
        <Text
          className="text-lg text-ellipsis overflow-hidden"
          style={{
            textDecorationLine: item.isCompleted ? "line-through" : "none",
          }}
        >
          {item.todoName}
        </Text>
      </TouchableOpacity>
    </>
  );
}
