import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import { icons } from "../../constants";
import TabIcon from "@/components/TabIcon";



const Tablayout = () => {
  return (
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor:'#019CFF',
          tabBarInactiveTintColor:'#cdcde0',
          tabBarStyle:{
            backgroundColor:'#fff',
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name={"Home"}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name={"Create"}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name={"Profile"}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>

  );
};

export default Tablayout;
