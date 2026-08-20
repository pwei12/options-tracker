import { options } from "@/constants/mock_data";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ListEmpty from "./ListEmpty";
import OptionCard from "./OptionCard";

const LatestOptionsList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        // TODO: query the latest 5 options from the database instead of using mock data
        data={options.slice(0, 5)}
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
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
        ListEmptyComponent={() => (
          <ListEmpty
            message="No option added yet."
            containerStyle={{
              width: "100%",
              flex: 1,
            }}
          />
        )}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
};

export default LatestOptionsList;

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
});
