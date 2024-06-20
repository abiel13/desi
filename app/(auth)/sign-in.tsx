import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { getLoggedinUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SigninScreen = () => {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { setUser, setIsLoggedIn } = useGlobalContext();

  const handleSubmit = async () => {
    try {
      if (!formdata.email || !formdata.password) {
        Alert.alert("Please fill in all fields");
      }
      setIsLoading(true);

      await signIn(formdata.email, formdata.password);
      const res = await getLoggedinUser();
      setUser(res);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error: any) {
      Alert.alert("An error occured ", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#fff] h-full">
      <ScrollView>
        <View className="  w-full justify-center h-full px-4 my-6">
          <Image
            source={images.logo}
            className="w-[100px] h-[35px]"
            resizeMode="contain"
          />

          <Text className="text-black font-psemibold text-xl mt-3">
            Log in to Desi
          </Text>

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
            title="Sign in"
            onClick={handleSubmit}
            isloading={isLoading}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-xs text-gray-100 font-psemibold ">
              Don't have an Account
            </Text>
            <Link
              href={"/sign-up"}
              className="text-xs text-secondary-100 capitalize font-psemibold "
            >
              sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SigninScreen;
