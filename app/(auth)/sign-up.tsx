import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createAccount } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const Signup = () => {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const handleSubmit = async () => {
    try {
      if (!formdata.email || !formdata.password || !formdata.username) {
        Alert.alert("Please fill in all fields");
      }
      setIsLoading(true);

      const response = await createAccount(
        formdata.email,
        formdata.password,
        formdata.username
      );
      setUser(response);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error: any) {
      Alert.alert("An error occured ", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="  w-full justify-center h-full px-4 my-6">
          <Image
            source={images.logo}
            className="w-[100px] h-[35px]"
            resizeMode="contain"
          />

          <Text className="text-white font-psemibold text-xl mt-3">
            Register your Aora Account
          </Text>
          <FormField
            title="Username"
            value={formdata.username}
            handleChange={(e) =>
              setFormdata((prev) => {
                return { ...prev, username: e };
              })
            }
            extraStyles="mt-7"
          />
          <FormField
            title="Email"
            value={formdata.email}
            handleChange={(e) =>
              setFormdata((prev) => {
                return { ...prev, email: e };
              })
            }
            extraStyles="mt-7"
          />
          <FormField
            title="Password"
            value={formdata.password}
            handleChange={(e) =>
              setFormdata((prev) => {
                return { ...prev, password: e };
              })
            }
            extraStyles="mt-7"
            type="password"
          />

          <CustomButton
            customStyles="mt-8"
            title="Register"
            onClick={handleSubmit}
            isloading={isLoading}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-xs text-gray-100 font-psemibold ">
              Already have an Account
            </Text>
            <Link
              href={"/sign-in"}
              className="text-xs text-secondary-100 capitalize font-psemibold "
            >
              sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
