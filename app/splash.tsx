import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function SplashScreen() {
  useEffect(() => {
    const checkOnboarding = async () => {
      const onboarded = await AsyncStorage.getItem("hasOnboarded");
      setTimeout(() => {
        if (onboarded === "true") {
          router.replace("/"); // Go to home
        } else {
          router.replace("/(onboarding)/intro1"); // Show onboarding
        }
      }, 2500);
    };

    checkOnboarding();
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-white dark:bg-black">
      <Text className="text-4xl font-bold text-black dark:text-white mb-6">MoodDrip</Text>
      <ActivityIndicator size="large" color="#666" />
    </View>
  );
}