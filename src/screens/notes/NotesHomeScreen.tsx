import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import { PlusIcon } from "react-native-heroicons/solid";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { RootBottomTabParamList } from "../../types/navigationType";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useEffect } from "react";
import { Context } from "../../Context";
import { ContextType } from "../../types/contextType";
import { useIsFocused } from "@react-navigation/native";
import { IconSize, headerTitleSize } from "../../utility";

type NotesHomeProps = NativeStackScreenProps<RootBottomTabParamList, "Notes">;

export default function NotesHomeScreen({ navigation }: NotesHomeProps) {
  const { notes, getNotes ,status} = useContext(Context) as ContextType;

  useEffect(() => {
    getNotes();
  }, [status]);
  return (
    <SafeAreaView className="flex-1">
      <View className=" flex-row items-center py-3">
        <Text style={{ fontSize: hp(headerTitleSize) }} className="pl-4">
          All Notes
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={1}
        className="flex-row items-center gap-x-2 bg-gray-300 rounded-full mx-2 py-2.5 pl-1"
        onPress={() => navigation.navigate("NotesSearch")}
      >
        <MagnifyingGlassIcon fill="black" size={hp(IconSize)} />
        <Text>Search notes</Text>
      </TouchableOpacity>
      <View className="flex-1 relative pt-1">
        <FlatList
          data={notes}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
              activeOpacity={0.8}
              onLongPress={() => navigation.navigate("DeleteNote")}
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

        <View className="bottom-0 absolute w-full flex-row justify-center">
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("AddNote")}
            className="flex-row justify-center items-center bg-green-500 rounded-full w-14 h-14 "
          >
            <PlusIcon fill="white" size={hp(IconSize+2)} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
