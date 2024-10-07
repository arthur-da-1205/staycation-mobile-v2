import { useApp } from "@provider/app.provider";
import { Redirect, useRouter } from "expo-router";
import React from "react";

const Index = () => {
  const { isAuthenticated, user } = useApp();

  return !isAuthenticated ? <Redirect href="/login" /> : <Redirect href="/home" />;
};

export default Index;
