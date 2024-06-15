import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";

const App = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full justify-center items-center px-4 h-[85vh] ">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[100px] h-[74px]"
          />
          <Image
            source={images.cards}
            resizeMode="contain"
            className="max-w-[350px] w-full h-[280px] "
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Posibilities with
              <Text className="text-secondary-200"> Aora</Text>
            </Text>
            <Image
              source={images.path}
              className=" w-r[136px] h-[15px] absolute -bottom-3 -right-16"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-8 text-center">
            where creativity meets innoviation : emabark on a journey of
            limitless exploration with Aora
          </Text>
          <CustomButton
            title="Continue with email"
            customStyles="w-full mt-4"
            onClick={() => router.push("/sign-in")}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="dark" />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
