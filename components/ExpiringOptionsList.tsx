import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Link } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ListEmpty from "./ListEmpty";
import LoadingIndicator from "./LoadingIndicator";
import OptionCard from "./OptionCard";

const ExpiringOptionsList = () => {
  const expiringOptions = useQuery(api.options.getSoonestExpiringOptions, {
    limit: 3,
  });

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>Expiring</Text>
        <Link href="/tabs/list" style={styles.link}>
          All
        </Link>
      </View>
      {expiringOptions === undefined ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={expiringOptions}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <OptionCard option={item} />}
          ListEmptyComponent={() => (
            <ListEmpty message="No expiring options found." />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      )}
    </View>
  );
};

export default ExpiringOptionsList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  link: {
    fontSize: 16,
    color: "blue",
  },
});
