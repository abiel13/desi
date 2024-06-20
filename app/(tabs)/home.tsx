import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import VideoCard from "@/components/VideoCard";
import { images } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getLatestPost, getPost } from "@/lib/appwrite";
import { useFetch } from "@/lib/hooks/useFetch";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data: posts, loading, refetch } = useFetch(getPost);
  const { data: latestPost } = useFetch(getLatestPost);
  const { user } = useGlobalContext();

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

  return (
    <SafeAreaView className="bg-[#fff] h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => `${item.$id}`}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-2 ">
            <View className="flex-row justify-between mb-6">
              <View>
                <Text className="font-pmedim text-gray-100 text-sm">
                  Welcome Back
                </Text>
                <Text className="font-psemibold text-2xl text-black">
                  {user?.username}
                </Text>
              </View>
              <Image
                source={images.logo}
                className="w-9 h-10"
                resizeMode="contain"
              />
            </View>
            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 mb-3 text-pregular">
                Latest Videos
              </Text>
              <Trending post={latestPost ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
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

export default Home;
