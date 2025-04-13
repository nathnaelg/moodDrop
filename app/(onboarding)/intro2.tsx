import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Intro2() {
  return (
    <View className="flex-1 justify-center items-center bg-white dark:bg-black px-6">
      <Text className="text-4xl font-bold text-black dark:text-white text-center mb-6">
        Stay safe.{"\n"}Stay real.
      </Text>
      <TouchableOpacity
        className="mt-10 bg-black dark:bg-white px-6 py-3 rounded-full"
        onPress={() => router.push("/(onboarding)/intro3")}
      >
        <Text className="text-white dark:text-black text-lg">Next</Text>
      </TouchableOpacity>
    </View>
  );
}