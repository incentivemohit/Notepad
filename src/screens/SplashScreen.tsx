import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RootStackParamList } from "../types/navigationType";

export default function SplashScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  setTimeout(() => {
    navigation.navigate("Home");
  }, 1000);

  return (
    <>
      <View className="flex-1 items-center justify-center">
        <View className="flex-col gap-y-3 justify-center items-center">
          <Image
            source={require("../../assets/notepad.png")}
            alt=""
            style={{ width: 160, height: 160 }}
          />
          <Text style={{ fontSize: hp(2.8) }}>Notepad</Text>
        </View>
      </View>
    </>
  );
}
