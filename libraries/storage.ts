import Encryptor from "@lib/encryptor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { forIn, startsWith } from "lodash-es";

const APP_PREFIX = "staycation_app_";
const encryptor = new Encryptor("staycationV2");

export class LocalStorage {
  // static getLength() {
  //   return SecureStore.length;
  // }

  static async storeData(storageKey: string, value: string) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(storageKey, jsonValue);
    } catch (e) {
      console.log("Gagal menyimpan di localstorage");
    }
  }

  static async getData(storageKey: string) {
    try {
      const jsonValue = await AsyncStorage.getItem(storageKey);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log("Gagal mengambil data dari localstorage");
    }
  }

  static async setItem(key: string, value: any) {
    if (value !== "undefined" && typeof value !== "undefined" && value !== null) {
      await SecureStore.setItemAsync(key, value);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  }

  static async getItem(key: string) {
    const val = await SecureStore.getItemAsync(key);
    if (val === null) {
      return null;
    }

    // const decrypted = encryptor.decrypt(val);

    // return typeof decrypted !== "string"
    //   ? JSON.stringify(decrypted)
    //   : decrypted;
    //
    return val;
  }

  static removeItem(key: string) {
    SecureStore.deleteItemAsync(key);
  }

  static clear() {
    forIn(window.localStorage, (value: any, objKey: string) => {
      if (startsWith(objKey, APP_PREFIX) === true) {
        window.localStorage.removeItem(objKey);
      }
    });
  }

  /** Tests that localStorage exists, can be written to, and read from. */
  // static testLocalStorage() {
  //   const testValue = "testValue";
  //   const testKey = "testKey";
  //   const errorMessage = "localStorage did not return expected value";

  //   LocalStorage.setItem(testKey, testValue);

  //   const retrievedValue = LocalStorage.getItem(testKey);

  //   LocalStorage.removeItem(testKey);

  //   if (retrievedValue !== testValue) {
  //     throw new Error(errorMessage);
  //   }
  // }
}
