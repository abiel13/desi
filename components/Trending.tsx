import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
import { Video, ResizeMode } from "expo-av";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }: any) => {
  const [play, setPlay] = useState(false);
;
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem == item.$id ? zoomIn : zoomOut}
    >
      {play ? (
        <Video
          source={{ uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
          className="w-52 h-72 rounded-[15px]"
          shouldPlay
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
        />
      ) : (
        <TouchableOpacity
          className=" relative justify-center items-center"
          onPress={() => setPlay(true)}
          activeOpacity={0.4}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[15px] overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute "
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ post }: { post: any }) => {
  const [activeItem, setActiveItem] = useState(post[1]);

  const viewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={post}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 80,
      }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
};

export default Trending;
