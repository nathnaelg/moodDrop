import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Intro3() {
  const finishOnboarding = async () => {
    await AsyncStorage.setItem("hasOnboarded", "true");
    router.replace("/");
  };

  return (
    <View className="flex-1 justify-center items-center bg-white dark:bg-black px-6">
      <Text className="text-4xl font-bold text-black dark:text-white text-center mb-6">
        Share anything,{"\n"}Anonymously.
      </Text>
      <TouchableOpacity
        className="mt-10 bg-blue-600 px-6 py-3 rounded-full"
        onPress={finishOnboarding}
      >
        <Text className="text-white text-lg font-semibold">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}