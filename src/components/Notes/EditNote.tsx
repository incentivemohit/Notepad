import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { RootStackParamList } from "../../types/navigationType";
import { Text, TextInput, ToastAndroid, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { CheckIcon } from "react-native-heroicons/solid";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Context } from "../../Context";
import { ContextType } from "../../types/contextType";
import { IconSize } from "../../utility";
import { StackNavigationProp } from "@react-navigation/stack";

export default function EditNote() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { notes, setNotes } = useContext(Context) as ContextType;
  const route = useRoute<RouteProp<RootStackParamList, "EditNote">>();
  const { id } = route.params;
  const [title, setTitle] = useState<string>("");
  const [desc, setdesc] = useState<string>("");
  const date = new Date();

  const getNote = () => {
    const note = notes.filter((item) => {
      return item.id === id;
    });
    setTitle(note[0].title);
    setdesc(note[0].desc);
  };

  const updateNote = () => {
    const newArray = notes.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          title: title,
          desc: desc,
          timeDate: `${date.toLocaleTimeString(navigator.language, {
            hour: "2-digit",
            minute: "2-digit",
          })}, ${date.toLocaleDateString()}`,
        };
      } else {
        return item;
      }
    });
    setNotes(newArray);
  };

  const handleSaveNote = () => {
    updateNote();
    navigation.goBack();
    setTimeout(() => {
      ToastAndroid.show("Updated ", ToastAndroid.SHORT);
    }, 800);
  };

  useEffect(() => {
    getNote();
  }, [id]);

  return (
    <>
      <SafeAreaView className="flex-1">
        <View className="flex-row items-center justify-between px-4 py-2">
          <ArrowLeftIcon
            fill="black"
            size={hp(IconSize)}
            onPress={() => navigation.goBack()}
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
            {`${date.toLocaleTimeString(navigator.language, {
              hour: "2-digit",
              minute: "2-digit",
            })}, ${date.toLocaleDateString()}`}
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
