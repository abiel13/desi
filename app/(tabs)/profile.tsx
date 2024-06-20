import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import VideoCard from "@/components/VideoCard";
import { icons } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import { logoutUser, searchPost, searchPostByUserId } from "@/lib/appwrite";
import { useFetch } from "@/lib/hooks/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useFetch(() => searchPostByUserId(user.$id));

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      throw new Error(`Couldn't fetch posts`);
    } finally {
      setRefreshing(false);
    }
  };

  const logout = async () => {
    await logoutUser();

    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-[#fff] h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => `${item.$id}`}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full flex-col gap-1 my-8">
            <TouchableOpacity
              onPress={logout}
              className="w-full items-center flex-row px-4 justify-end"
            >
              <Image
                source={icons.logout}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="w-full items-center justify-center gap-4">
              <View className="p-[0.5px] w-[45px] h-[45px] rounded-xl border border-secondary">
                <Image
                  source={{ uri: user?.avatar }}
                  className="w-full h-full rounded-xl"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-lg font-psemibold text-black">
                {user?.username}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="You haven't Created any videos"
            subtitle="Start creating Videos"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Profile;
