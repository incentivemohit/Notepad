import * as React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { Modal, Text } from "react-native-paper";
import uuid from "react-native-uuid";
import { Context } from "../../Context";
import { ContextType, Todo } from "../../types/contextType";

type Props = {
  visible: boolean;
  hideModal: () => void;
};

const AddTodo = ({ visible, hideModal }: Props) => {
  const [text, setText] = React.useState<string>("");
  const { saveTodo } = React.useContext(Context) as ContextType;
  const unique_id = uuid.v4();
  const containerStyle = { backgroundColor: "white", padding: 20, margin: 10 };

  const saveTodoData = () => {
    const todoObject: Todo = {
      id: unique_id.toString(),
      todoName: text,
      isSelected: false,
      isCompleted: false,
    };
    saveTodo(todoObject);
    setText("");
    hideModal();
  };

  return (
    <Modal visible={visible} contentContainerStyle={containerStyle}>
      <View className="flex-col gap-y-4">
        <TextInput
          placeholder="Add a to-do item"
          value={text}
          onChangeText={(value) => setText(value)}
        />
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={hideModal} className="bg-gray-300 p-2">
            <Text>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={saveTodoData} className="bg-gray-300 p-2">
            <Text>SAVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddTodo;
