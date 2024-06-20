import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { ResizeMode, Video } from "expo-av";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
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
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    let result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/jpg", "image/jpeg", "image/png"]
          : ["video/mp4", "video/gif"],
    });

    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes:
    //     selectType === "image"
    //       ? ImagePicker.MediaTypeOptions.Images
    //       : ImagePicker.MediaTypeOptions.Videos,
    //   aspect: [4, 3],
    //   quality: 1,
    // });
    console.log(result);
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
    if (!form.video || !form.thumbnail || !form.title.length) {
      return Alert.alert(
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
    <SafeAreaView className="bg-[#fff] h-full">
      <ScrollView className="px-4 my-6">
        <Text className="font-psemibold text-lg text-black">Upload Video</Text>

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
          <Text className="text-black font-pmedium">Upload Video</Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri! }}
                shouldPlay
                resizeMode={ResizeMode.COVER}
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="items-center justify-center w-full bg-white/50 h-52 rounded-xl space-y-2 border border-secondary">
                <Text className="font-psemibold text-black">
                  click to upload video
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 ">
          <Text className="text-black font-pmedium">Upload Image</Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className="items-center justify-center w-full bg-white/50 border border-secondary h-16 mt-1 rounded-xl space-y-2">
                <Text className="font-psemibold text-black">
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
