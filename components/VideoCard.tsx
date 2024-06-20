import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";

interface VideoCardI {
  video: {
    title: string;
    thumbnail: string;
    video: string;
    Creator: {
      username: string;
      avatar: string;
    };
  };
}

const VideoCard = ({ video }: VideoCardI) => {
  const {
    title,
    thumbnail,
    video: videoUrl,
    Creator: { username, avatar },
  } = video;
  const [play, setPlay] = useState(false);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row gap-2 flex-1">
          <View className="border border-secondary jsutify-center items-center rounded-xl w-[46px] h-[46px] p-[0.5px]">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-xl"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 gap-y-1">
            <Text
              className="text-sm font-psemibold text-black"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text className="text-xs text-gray-100" numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <Video
          source={{
            uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          }}
          className="w-52 h-72 rounded-[15px]"
          shouldPlay
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
        />
      ) : (
        <TouchableOpacity
          className="h-60 mt-3 w-full rounded-xl relative justify-center items-center"
          onPress={() => setPlay(true)}
          activeOpacity={0.4}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
