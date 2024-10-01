import { useApp } from "@provider/app.provider";
import { Redirect, Slot, Stack, Tabs } from "expo-router";
import { ScrollView, Text, View } from "native-base";
import React from "react";

const TabsLayout = () => {
  const { user, isAuthenticated } = useApp();

  if (!isAuthenticated && !user) {
    return <Redirect href={"/login"} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 84,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
