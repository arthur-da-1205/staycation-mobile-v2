import { LocalStorage } from "@lib/storage";
import { useGetProfileQuery } from "@resources/gql/profile.gql";
import { UserModel } from "@resources/model/user.model";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IContextProps {
  isAuthenticated: boolean;
  user: typeof UserModel | null;
  setUser: (user: typeof UserModel) => void;
  setToken: (token: string) => void;
  setLogout: () => void;
}

const AppContext = createContext<IContextProps>({
  isAuthenticated: false,
  user: null,
  setUser: () => {},
  setToken: () => {},
  setLogout: () => {},
});

interface IProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<IProviderProps> = ({ children }) => {
  const localToken: any = AsyncStorage.getItem("user_token");
  const localUser: any = AsyncStorage.getItem("user_profile");
  const [token, setTokenState] = useState<string | null>(localToken);
  const [user, setUserState] = useState<typeof UserModel | null>(localUser ? localUser : null);

  const [getProfile] = useGetProfileQuery();

  const setToken = (token: string | null) => {
    if (!token) {
      AsyncStorage.removeItem("user_token");
    } else {
      // LocalStorage.setItem("user_token", token);
      AsyncStorage.setItem("user_token", token);
    }

    setTokenState(token);
  };

  const setUser = (user: typeof UserModel | null) => {
    if (!user) {
      AsyncStorage.removeItem("user_profile");
    } else {
      AsyncStorage.setItem("user_profile", JSON.stringify(user));
    }

    setUserState(user);
  };

  const setLogout = () => {
    // do not change the order
    setUserState(null);
    setToken(null);
    AsyncStorage.removeItem("user_profile");
    AsyncStorage.clear();
  };

  useEffect(() => {
    if (localToken) {
      console.log("local", localToken);
      getProfile().then((res) => {
        if (res.data) {
          setUser(res.data.data.userPersonalProfile);
          console.log(res.data.data.userPersonalProfile);
        }

        if (res.error) {
          console.log(res.error);
        }
      });
    }
  }, []);

  const contextPayload = React.useMemo(
    () => ({
      isAuthenticated: !!token,
      user,
      setUser,
      setLogout,
      setToken,
    }),
    [user, token]
  );

  return <AppContext.Provider value={contextPayload}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
