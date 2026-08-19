import React from "react";
import { StyleSheet, Text, View } from "react-native";

// TODO: remove mock data and implement real data fetching logic
const totalProfitLoss = 1000.0;

const HomeSummaryCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Total (USD)</Text>
      <Text
        style={styles.profitLossText}
      >{`${totalProfitLoss >= 0 ? "" : "-"}$${totalProfitLoss.toFixed(2)}`}</Text>
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
