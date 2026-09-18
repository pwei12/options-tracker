import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

type StatusTagProps = {
  hasExpired: boolean;
  isClosed: boolean;
};
const StatusTag = ({ hasExpired, isClosed }: StatusTagProps) => {
  if (!hasExpired && !isClosed) {
    return null;
  }

  return (
    <VStack className="self-start bg-info p-1 rounded-sm">
      <Text className="text-info-foreground text-xs">
        {isClosed ? "Closed" : "Expired"}
      </Text>
    </VStack>
  );
};

export default StatusTag;
