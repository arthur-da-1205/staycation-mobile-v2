import { useApp } from "@provider/app.provider";
import { Redirect, Slot, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const { isAuthenticated, user, setUser } = useApp();
  const router = useRouter();

  return isAuthenticated && user ? (
    <Redirect href="/home" />
  ) : (
    <Redirect href="/login" />
  );
};

export default Index;
