import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { ChangeEvent, useState } from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ initialQuery }: { initialQuery?: string }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  const handlePress = () => {
    if (!query) {
      return Alert.alert("Missing query", "please include to query db");
    }
    if (pathname.startsWith("/search")) {
      router.setParams({ query });
    } else {
      router.push(`/search/${query}`);
    }
  };

  return (
    <View className="w-full h-14 px-4 bg-black-100 flex-row rounded-xl focus:border-secondary border-2 items-center border-black-200">
      <TextInput
        value={query}
        placeholder={"Search for a video idea"}
        onChangeText={(e) => setQuery(e)}
        className="flex-1 text-white font-pregular mt-0.5 space-x-4 "
        placeholderTextColor={"#7b7b8b"}
      />
      <TouchableOpacity onPress={handlePress}>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
