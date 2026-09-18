import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { FlatList } from "react-native";
import ListEmpty from "./ListEmpty";
import LoadingIndicator from "./LoadingIndicator";
import OptionCard from "./OptionCard";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

const LatestOptionsList = () => {
  const latestOptions = useQuery(api.options.getLatestOptions, { limit: 5 });

  return (
    <VStack className="my-2">
      <Text className="mb-2 text-foreground font-semibold text-lg">Latest</Text>
      {latestOptions === undefined ? (
        <LoadingIndicator className="h-32" />
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={latestOptions}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <OptionCard option={item} />}
          ItemSeparatorComponent={() => <VStack style={{ width: 8 }} />}
          ListEmptyComponent={() => (
            <ListEmpty message="No option added yet." />
          )}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}
    </VStack>
  );
};

export default LatestOptionsList;
