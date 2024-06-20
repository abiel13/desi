import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

interface EmptyStateI {
  title: string;
  subtitle: string;
}

const EmptyState = ({ title, subtitle }: EmptyStateI) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        alt="problem loading image"
        resizeMode="contain"
        className="w-[200px] h-[200px]"
      />
      <Text className="font-psemibold  text-black">{title}</Text>
      <Text className="text-gray-100 font-pregular text-base">{subtitle}</Text>

      <CustomButton
        title="Create Video"
        onClick={() => router.push("/create")}
        customStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
