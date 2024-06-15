import { Text, TouchableOpacity } from "react-native";
import React from "react";

interface CustomButtonI {
  title: string;
  customStyles: string;
  onClick: () => void;
  isloading?: boolean;
  textstyles?: string;
}

const CustomButton = ({
  title,
  customStyles,
  onClick,
  isloading,
  textstyles,
}: CustomButtonI) => {
  return (
    <TouchableOpacity
      className={`bg-secondary rounded-xl px-3 min-h-[52px] justify-center items-center ${customStyles} ${
        isloading && "opacity-50"
      }`}
      disabled={isloading}
      onPress={onClick}
    >
      <Text className={`text-primary font-psemibold ${textstyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
