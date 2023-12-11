import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { PlusIcon } from "react-native-heroicons/solid";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { useContext, useEffect } from "react";
import { Context } from "../../Context";
import { ContextType } from "../../types/contextType";
import { IconSize, headerTitleSize } from "../../utility";
import { MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs";
import { RootStackParamList } from "../../types/navigationType";
import NoteComponent from "../../components/Notes/NoteComponent";

type NoteScreenProps = MaterialBottomTabNavigationProp<RootStackParamList>;

export default function NotesHomeScreen({
  navigation,
}: {
  navigation: NoteScreenProps;
}) {
  const { notes, getNotes, status } = useContext(Context) as ContextType;

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
        onPress={() =>
          navigation.navigate("SearchScreen", {
            searchParams: "notes",
          })
        }
      >
        <MagnifyingGlassIcon fill="black" size={hp(IconSize)} />
        <Text>Search notes</Text>
      </TouchableOpacity>
      <View className="flex-1 relative pt-1">
        <FlatList
          data={notes}
          renderItem={({ item }) => {
            return (<NoteComponent item={item} />
            );
          }}
        />

        <View className="bottom-0 absolute w-full flex-row justify-center">
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("AddNote")}
            className="flex-row justify-center items-center bg-green-500 rounded-full w-14 h-14 "
          >
            <PlusIcon fill="white" size={hp(IconSize + 2)} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
