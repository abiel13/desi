import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";

const SigninScreen = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className=" items-center w-full justify-center min-h-[85vh] px-4 my-6">
          <Image source={images.logo} className="w-[100px] h-[35px]" resizeMode="contain"/>

          <Text className="text-white font-psemibold text-xl">
            Log in to Aora
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SigninScreen;
