import { AsyncStorage } from "react-native";

export const USER_KEY = "auth-demo-key";

export const signedIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const signedOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};