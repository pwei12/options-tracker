import OptionCard from "@/components/OptionCard";
import { options } from "@/constants/mock_data";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const List = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={options}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OptionCard
            name={item.name}
            premium={item.premium}
            strikePrice={item.strikePrice}
            expirationDate={item.expirationDate}
            optionType={item.optionType}
            tradingType={item.tradingType}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
});
