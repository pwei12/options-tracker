import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useMemo } from "react";
import LoadingIndicator from "./LoadingIndicator";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

const HomeSummaryCard = () => {
  const allOptions = useQuery(api.options.getAllOptions);

  const totalProfitLoss = useMemo(() => {
    const items = allOptions ?? [];

    return items.reduce((total, option) => {
      const fee = option.openFee + (option.closeFee ?? 0);
      const closePrice = option.closePrice ?? 0;

      if (option.tradingType === "short") {
        const net = option.premium - fee - closePrice;
        return total + net;
      }

      return total + (closePrice - option.premium - fee);
    }, 0);
  }, [allOptions]);

  return (
    <VStack className="bg-secondary gap-0.5 p-4 my-2 rounded-lg shadow-md">
      <Text className="text-muted-foreground text-xs">Net (USD)</Text>
      {allOptions === undefined ? (
        <LoadingIndicator className="w-48" />
      ) : (
        <Text className="text-card-foreground text-3xl font-bold">{`${totalProfitLoss >= 0 ? "" : "-"}$${Math.abs(totalProfitLoss).toFixed(2)}`}</Text>
      )}
    </VStack>
  );
};

export default HomeSummaryCard;
