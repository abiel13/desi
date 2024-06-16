import { View, Text, Image } from 'react-native'
import React from 'react'

interface TabIconProps {
    icon: any;
    color: string;
    name: string;
    focused: boolean;
  }
  
  const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
    return (
      <View className="items-center justify-center gap-1">
        <Image
          source={icon}
          resizeMode="contain"
          tintColor={color}
          className={"w-6 h-6"}
        />
        <Text
          className={`${focused ? "font-psemibold" : "font-regular"} text-xs`} style={{color:color}}
        >
          {name}
        </Text>
      </View>
    );
  };

export default TabIcon