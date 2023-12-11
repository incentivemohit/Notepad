import React, { useContext, useState } from "react";
import { TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ContextType } from "../../types/contextType";
import { Context } from "../../Context";
import { IconSize } from "../../utility";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigationType";
import SearchResults from "../../components/Search/SearchResults";
import { RouteProp, useRoute } from "@react-navigation/native";

type SearchScreenProps = StackNavigationProp<
  RootStackParamList,
  "SearchScreen"
>;

export default function SearchScreen({
  navigation,
}: {
  navigation: SearchScreenProps;
}) {
  const { notes, todos } = useContext(Context) as ContextType;
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const route = useRoute<RouteProp<RootStackParamList, "SearchScreen">>();

  const searchItems = (type: string) => {
    if (type === "notes") {
      const notesData: any = notes.filter((item) =>
        item.title.toLowerCase().trim().includes(search.toLowerCase())
      );
      setSearchResults(notesData);
    } else {
      const todosData: any = todos.filter((item) =>
        item.todoName.toLowerCase().trim().includes(search.toLowerCase())
      );
      setSearchResults(todosData);
    }
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
              value={search}
              returnKeyType="done"
              onKeyPress={() => searchItems(route.params.searchParams)}
              onChangeText={(text) => setSearch(text)}
              placeholder={
                route.params.searchParams === "notes"
                  ? "Search notes"
                  : "Search to-dos"
              }
            />
          </View>
        </View>
        <View className="flex-1 pt-2">
          <SearchResults
            searchResults={searchResults}
            category={route.params.searchParams}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
