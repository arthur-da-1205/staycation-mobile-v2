import { useApp } from "@provider/app.provider";
import { Redirect, Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  const { isAuthenticated, user } = useApp();

  if (isAuthenticated && user) return <Redirect href="/home" />;

  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
