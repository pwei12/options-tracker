import CreateOrUpdateOptionModal from "@/components/CreateOrUpdateOptionModal";
import { Pressable } from "@/components/ui/pressable";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { useState } from "react";

export default function TabLayout() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalDisclosure = (isOpen: boolean) => () =>
    setIsModalVisible(isOpen);

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#D4A017",
          tabBarInactiveTintColor: "#ffffff",
          tabBarStyle: {
            backgroundColor: "#654321",
            height: 88,
          },
          sceneStyle: { backgroundColor: "transparent" },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home-sharp" : "home-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="list"
          options={{
            title: "List",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "list-sharp" : "list-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "settings-sharp" : "settings-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        />
      </Tabs>

      <Pressable
        onPress={handleModalDisclosure(true)}
        accessibilityLabel="Add new option"
        className="bg-primary w-16 h-16 rounded-full justify-center items-center absolute right-2 bottom-28 z-10 shadow-lg"
      >
        <Ionicons name="add" size={32} color="#ffffff" />
      </Pressable>

      <CreateOrUpdateOptionModal
        isOpen={isModalVisible}
        onClose={handleModalDisclosure(false)}
      />
    </>
  );
}
