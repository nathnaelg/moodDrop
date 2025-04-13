import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [vents, setVents] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    const fetchVents = async () => {
      const q = query(collection(db, "vents"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const items = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVents(items);
    };

    fetchVents();
  }, []);

  const renderTab = (label: string) => (
    <TouchableOpacity
      onPress={() => setActiveTab(label)}
      className={`px-4 py-2 rounded-full ${
        activeTab === label
          ? "bg-blue-600"
          : "bg-gray-200 dark:bg-gray-700"
      }`}
    >
      <Text
        className={`text-sm font-medium ${
          activeTab === label ? "text-white" : "text-black dark:text-white"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white dark:bg-black pt-12 px-4">
      <Text className="text-3xl font-bold mb-4 text-black dark:text-white">MoodDrip</Text>

      {/* Tabs */}
      <View className="flex-row space-x-3 mb-4">
        {["All", "Trending", "Emotions"].map(renderTab)}
      </View>

      {/* Vents List */}
      <FlatList
        data={vents}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Link href={`/story/${item.id}`} asChild>
            <TouchableOpacity className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <Text className="text-base text-black dark:text-white" numberOfLines={3}>
                {item.text}
              </Text>
            </TouchableOpacity>
          </Link>
        )}
      />

      {/* Floating + Button */}
      <Link href="/post" asChild>
        <TouchableOpacity className="absolute bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg">
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}