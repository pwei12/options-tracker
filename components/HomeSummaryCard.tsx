import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoadingIndicator from "./LoadingIndicator";

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
    <View style={styles.card}>
      <Text style={styles.title}>Net (USD)</Text>
      {allOptions === undefined ? (
        <LoadingIndicator />
      ) : (
        <Text
          style={styles.profitLossText}
        >{`${totalProfitLoss >= 0 ? "" : "-"}$${Math.abs(totalProfitLoss).toFixed(2)}`}</Text>
      )}
    </View>
  );
};

export default HomeSummaryCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9cece",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 100,
    alignItems: "flex-end",
  },
  title: {
    fontSize: 10,
    color: "#555",
  },
  profitLossText: {
    fontWeight: "bold",
    fontSize: 24,
  },
});
