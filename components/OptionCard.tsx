import { OptionType, TradingType } from "@/types/types";
import { formatDateToYYYYMMDD } from "@/utils/date.utils";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type OptionCardProps = {
  id: string;
  name: string;
  premium: number;
  strikePrice: number;
  expirationDate: string;
  optionType: OptionType;
  tradingType: TradingType;
};

const OptionCard = ({
  id,
  name,
  premium,
  strikePrice,
  expirationDate,
  optionType,
  tradingType,
}: OptionCardProps) => {
  const isExpired = new Date(expirationDate) < new Date();
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/option/${encodeURIComponent(id)}`)}
      style={[styles.card, isExpired && styles.expired]}
    >
      <Text style={styles.name}>{name}</Text>
      <Text>
        <Text>{formatDateToYYYYMMDD(expirationDate)}</Text>
        {` `}
        <Text style={styles.italicText}>{`${strikePrice.toFixed(
          2,
        )}${optionType === OptionType.PUT ? "P" : "C"}`}</Text>
      </Text>
      <Text>
        <Text>{tradingType.toLocaleUpperCase()}</Text>{" "}
        <Text>{`$${premium.toFixed(2)}`}</Text>
      </Text>
    </TouchableOpacity>
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
