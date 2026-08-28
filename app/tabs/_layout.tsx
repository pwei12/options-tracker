import CreateOrUpdateOptionModal from "@/components/CreateOrUpdateOptionModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

export default function TabLayout() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalDisclosure = (isOpen: boolean) => () =>
    setIsModalVisible(isOpen);

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#fd5f2f",
          tabBarStyle: {
            backgroundColor: "#25292e",
            height: 80,
          },
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
        style={styles.fab}
        accessibilityLabel="Add new option"
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

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 24,
    bottom: 92,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fd5f2f",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    zIndex: 10,
  },
});
