import { OptionType, TradingType } from "@/app/types";
import { formatToOptionExpirationDate } from "@/app/utils/formatDate";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type OptionCardProps = {
  name: string;
  premium: number;
  strikePrice: number;
  expirationDate: string;
  optionType: OptionType;
  tradingType: TradingType;
};

const OptionCard = ({
  name,
  premium,
  strikePrice,
  expirationDate,
  optionType,
  tradingType,
}: OptionCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text>
        <Text>{formatToOptionExpirationDate(expirationDate)}</Text>
        {` `}
        <Text style={styles.italicText}>{`${strikePrice.toFixed(
          2,
        )}${optionType === OptionType.PUT ? "P" : "C"}`}</Text>
      </Text>
      <Text
        style={{ color: tradingType === TradingType.BUY ? "red" : "green" }}
      >
        {" "}
        {`${tradingType === TradingType.BUY ? "-" : "+"}$${premium.toFixed(2)}`}
      </Text>
    </View>
  );
};

export default OptionCard;

const styles = StyleSheet.create({
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
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
  },
  italicText: {
    fontStyle: "italic",
  },
});
