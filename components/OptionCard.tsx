import { OptionType } from "@/app/types";
import { formatToOptionExpirationDate } from "@/utils/formatDate";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type OptionCardProps = {
  name: string;
  premium: number;
  strikePrice: number;
  expirationDate: string;
  optionType: OptionType;
  buyDate: string | undefined;
  sellDate: string | undefined;
};

const OptionCard = ({
  name,
  premium,
  strikePrice,
  expirationDate,
  optionType,
  buyDate,
  sellDate,
}: OptionCardProps) => {
  const isExpired = new Date(expirationDate) < new Date();
  return (
    <View style={[styles.card, isExpired && styles.expired]}>
      <Text style={styles.name}>{name}</Text>
      <Text>
        <Text>{formatToOptionExpirationDate(expirationDate)}</Text>
        {` `}
        <Text style={styles.italicText}>{`${strikePrice.toFixed(
          2,
        )}${optionType === OptionType.PUT ? "P" : "C"}`}</Text>
      </Text>
      <Text>{`${buyDate ? "-" : "+"}$${premium.toFixed(2)}`}</Text>
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
  expired: {
    opacity: 0.5,
  },
});
