import React, { useContext, useState } from "react";
import { Text, TextInput, ToastAndroid, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { CheckIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Context } from "../../Context";
import uuid from "react-native-uuid";
import { ContextType, Note } from "../../types/contextType";
import { IconSize } from "../../utility";
import { MaterialBottomTabNavigationProp } from "react-native-paper";
import { BottomTabParamList } from "../../types/navigationType";

export default function AddNote() {
  const navigaton =
    useNavigation<MaterialBottomTabNavigationProp<BottomTabParamList>>();

  const { saveNote } = useContext(Context) as ContextType;
  const [title, setTitle] = useState<string>("");
  const [desc, setdesc] = useState<string>("");
  const unique_id = uuid.v4();
  const date = new Date();

  const handleSaveNote = () => {
    const note: Note = {
      id: unique_id.toString(),
      title: title,
      timeDate: `${date.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
      })}, ${date.toLocaleDateString()}`,
      desc: desc,
      isSelected: false,
    };
    saveNote(note);
    navigaton.navigate("NotesHomeScreen");
    setTimeout(() => {
      ToastAndroid.show("Saved ", ToastAndroid.SHORT);
    }, 800);
    setTitle("");
    setdesc("");
  };

  return (
    <>
      <SafeAreaView className="flex-1">
        <View className="flex-row items-center justify-between px-4 py-2">
          <ArrowLeftIcon
            fill="black"
            size={hp(IconSize)}
            onPress={() => navigaton.goBack()}
          />
          {title != "" || desc != "" ? (
            <CheckIcon
              fill="black"
              size={hp(IconSize)}
              onPress={handleSaveNote}
            />
          ) : null}
        </View>
        <View className="flex-1 pl-4 flex-col gap-y-1 pt-2 ">
          <TextInput
            placeholder="Title"
            className="text-2xl"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />

          <Text className="text-xs">
            {date.toLocaleTimeString(navigator.language, {
              hour: "2-digit",
              minute: "2-digit",
            })}
            ,&nbsp;{date.toLocaleDateString()}
          </Text>
          <TextInput
            multiline
            placeholder="Note something down"
            className="text-lg"
            value={desc}
            onChangeText={(text) => setdesc(text)}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
