import ListEmpty from "@/components/ListEmpty";
import LoadingIndicator from "@/components/LoadingIndicator";
import OptionCard from "@/components/OptionCard";
import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BATCH_SIZE = 10;

const List = () => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.options.getPaginatedList,
    {},
    { initialNumItems: BATCH_SIZE },
  );

  const handleLoadMore = () => {
    // Only fetch if more data exists and we aren't already loading
    if (status === "CanLoadMore") {
      loadMore(BATCH_SIZE);
    }
  };

  const renderFooter = () => {
    if (status !== "LoadingMore") return null;
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {status === "LoadingFirstPage" ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <OptionCard option={item} />}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          ListEmptyComponent={() => (
            <ListEmpty message="No option added yet." />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  loaderContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
});
