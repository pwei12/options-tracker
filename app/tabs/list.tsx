import ListEmpty from "@/components/ListEmpty";
import LoadingIndicator from "@/components/LoadingIndicator";
import OptionCard from "@/components/OptionCard";
import { HStack } from "@/components/ui/hstack";
import { Spinner } from "@/components/ui/spinner";
import { VStack } from "@/components/ui/vstack";
import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import { FlatList } from "react-native";
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
      <VStack className="py-5">
        <Spinner size="small" color="white" />
      </VStack>
    );
  };

  return (
    <SafeAreaView>
      {status === "LoadingFirstPage" ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <OptionCard option={item} />}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <HStack style={{ height: 16 }} />}
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
