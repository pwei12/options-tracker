import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ListEmpty from "./ListEmpty";
import LoadingIndicator from "./LoadingIndicator";
import OptionCard from "./OptionCard";

const LatestOptionsList = () => {
  const latestOptions = useQuery(api.options.getLatestOptions, { limit: 5 });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest</Text>
      {latestOptions === undefined ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={latestOptions}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <OptionCard option={item} />}
          ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          ListEmptyComponent={() => (
            <ListEmpty
              message="No option added yet."
              containerStyle={{
                width: "100%",
                flex: 1,
              }}
            />
          )}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}
    </View>
  );
};

export default LatestOptionsList;

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
});
