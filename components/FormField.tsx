import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { ChangeEvent, useState } from "react";
import { icons } from "@/constants";

interface FormFieldI {
  title: string;
  value: string;
  handleChange: (e: string) => void;
  extraStyles?: string;
  keyboardType?: string;
  placeholder?: string;
  type?: string;
}

const FormField = ({
  title,
  value,
  handleChange,
  extraStyles,
  keyboardType,
  placeholder,
  type = "text",
}: FormFieldI) => {
  const [isShowPassword, setisShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${extraStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="w-full h-14 px-4 bg-black-100 flex-row rounded-xl focus:border-secondary border-2 items-center border-black-200">
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={handleChange}
          className="flex-1 text-white "
          placeholderTextColor={"#7b7b8b"}
          secureTextEntry={type === "password" && !isShowPassword}
        />

        {type === "password" && (
          <TouchableOpacity onPress={() => setisShowPassword(!isShowPassword)}>
            <Image
              source={isShowPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
