import OptionCard from "@/components/OptionCard";
import { options } from "@/constants/mock_data";
import React from "react";
import { FlatList } from "react-native";

const List = () => {
  return (
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
    />
  );
};

export default List;
