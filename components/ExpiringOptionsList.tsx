import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Link } from "expo-router";
import { FlatList } from "react-native";
import ListEmpty from "./ListEmpty";
import LoadingIndicator from "./LoadingIndicator";
import OptionCard from "./OptionCard";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

const ExpiringOptionsList = () => {
  const expiringOptions = useQuery(api.options.getSoonestExpiringOptions, {
    limit: 3,
  });

  return (
    <VStack className="my-2">
      <HStack className="justify-between">
        <Text className="mb-2 text-foreground font-semibold text-lg">
          Expiring
        </Text>
        <Link href="/tabs/list">
          <Text className="text-link">All</Text>
        </Link>
      </HStack>
      {expiringOptions === undefined ? (
        <LoadingIndicator className="h-28" />
      ) : (
        <FlatList
          data={expiringOptions}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <OptionCard option={item} />}
          ListEmptyComponent={() => (
            <ListEmpty message="No expiring options found." />
          )}
          ItemSeparatorComponent={() => <VStack className="h-4" />}
        />
      )}
    </VStack>
  );
};

export default ExpiringOptionsList;
