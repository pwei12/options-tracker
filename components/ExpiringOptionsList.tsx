import { options } from "@/constants/mock_data";
import { Link } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import OptionCard from "./OptionCard";

const ExpiringOptionsList = () => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>Expiring</Text>
        <Link href="/tabs/list" style={styles.link}>
          All
        </Link>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        // TODO: query the expiring options from the database instead of using mock data
        data={options.slice(0, 3)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OptionCard
            id={item.id}
            name={item.name}
            premium={item.premium}
            strikePrice={item.strikePrice}
            expirationDate={item.expirationDate}
            optionType={item.optionType}
            tradingType={item.tradingType}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
    </View>
  );
};

export default ExpiringOptionsList;

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
  link: {
    fontSize: 16,
    color: "blue",
  },
});
