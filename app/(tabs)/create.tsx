import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { ResizeMode, Video } from "expo-av";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { createVideo } from "@/lib/appwrite";

export interface formI {
  title: string;
  video: any;
  thumbnail: any;
  userId?: string;
}

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const { user } = useGlobalContext();

  const [form, setform] = useState<formI>({
    title: "",
    video: null,
    thumbnail: null,
  });

  const openPicker = async (selectType: "image" | "video") => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setform({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setform({ ...form, video: result.assets[0] });
      }
    }
  };

  const submit = async () => {
    const { video, thumbnail, title } = form;

    if (!video || !thumbnail || !title.length) {
      Alert.alert(
        "Missing Required Fields",
        "Please fill in all the fields to create post"
      );
    }
    try {
      setUploading(true);
      await createVideo({ ...form, userId: user.$id });

      Alert.alert("Success");
      router.push("/home");
    } catch (error: any) {
      Alert.alert("An error Occured", error.message as string);
    } finally {
      setUploading(false);
      setform({ title: "", thumbnail: null, video: null });
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="font-psemibold text-lg text-white">Upload Video</Text>

        <FormField
          title="Video Title"
          value={form.title}
          handleChange={(e) =>
            setform((prev) => {
              return { ...prev, title: e };
            })
          }
          extraStyles="mt-7"
          placeholder="video title"
        />

        <View className="mt-7 ">
          <Text className="text-white font-pmedium">Upload Video</Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri! }}
                shouldPlay
                resizeMode={ResizeMode.COVER}
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="items-center justify-center w-full bg-black-100 h-52 rounded-xl space-y-2">
                <Text className="font-psemibold text-white">
                  click to upload video
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 ">
          <Text className="text-white font-pmedium">Upload Image</Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className="items-center justify-center w-full bg-black-100 h-16 mt-1 rounded-xl space-y-2">
                <Text className="font-psemibold text-white">
                  click to upload image
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <CustomButton
          title="Upload Post"
          onClick={submit}
          customStyles="mt-8"
          isloading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
