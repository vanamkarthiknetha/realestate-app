import "./global.css"
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import GlobalProvider from "@/lib/global-provider";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const [fontLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontLoaded) SplashScreen.hideAsync()
  }, [fontLoaded])

  if (!fontLoaded) {
    return null; // Optionally, you can return a loading screen here
  }
  return <GlobalProvider>
    <StatusBar style="dark" />
    <Stack screenOptions={{ headerShown: false}} />;
  </GlobalProvider>
}
