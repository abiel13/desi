import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import VideoCard from "@/components/VideoCard";
import { searchPost } from "@/lib/appwrite";
import { useFetch } from "@/lib/hooks/useFetch";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { query } = useLocalSearchParams();

  const { data: posts, loading, refetch } = useFetch(() => searchPost(query));


  useEffect(() => {
    refetch();
  },[query])
 
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
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => `${item.$id}`}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-2 ">
            <View className="flex-row justify-between mb-6">
              <View>
                <Text className="font-pmedim text-gray-100 text-sm">
                  Search Results For
                </Text>
                <Text className="font-psemibold text-2xl text-white">
                  {query}
                </Text>
              </View>
            </View>
            <SearchInput />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found For Search Query"
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

export default Search;
