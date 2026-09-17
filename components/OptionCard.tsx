import { Text } from "@/components/ui/text";
import { Doc } from "@/convex/_generated/dataModel";
import { formatDateToYYYYMMDD, isDateExpired } from "@/utils/date.utils";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import StatusTag from "./StatusTag";
import { VStack } from "./ui/vstack";

type OptionCardProps = {
  option: Doc<"options">;
};

const OptionCard = ({ option }: OptionCardProps) => {
  const router = useRouter();
  const hasExpired = isDateExpired(option.expirationDate);
  const isClosed = option.closePrice !== undefined;

  return (
    <TouchableOpacity
      onPress={() => router.push(`/option/${option._id}`)}
      className={`p-4 rounded-lg shadow-md ${hasExpired ? "bg-accent/50" : "bg-accent"}`}
    >
      <VStack className="gap-1">
        <Text className="text-lg font-bold text-card-foreground">
          {option.name}
        </Text>
      </VStack>
      <Text className="italic text-card-foreground">
        <Text>{formatDateToYYYYMMDD(option.expirationDate)}</Text>
        {` `}
        <Text>{`${option.strikePrice.toFixed(
          2,
        )}${option.optionType === "put" ? "P" : "C"}`}</Text>
      </Text>
      <Text className="text-card-foreground">
        <Text>{option.tradingType.toLocaleUpperCase()}</Text>{" "}
        <Text>{`$${option.premium.toFixed(2)}`}</Text>
      </Text>
      <StatusTag hasExpired={hasExpired} isClosed={isClosed} />
    </TouchableOpacity>
  );
};

export default OptionCard;
