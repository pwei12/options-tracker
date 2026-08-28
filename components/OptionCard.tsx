import { Doc } from "@/convex/_generated/dataModel";
import { formatDateToYYYYMMDD } from "@/utils/date.utils";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StatusTag from "./StatusTag";

type OptionCardProps = {
  option: Doc<"options">;
};

const OptionCard = ({ option }: OptionCardProps) => {
  const router = useRouter();
  const hasExpired = new Date(option.expirationDate) < new Date();
  const isClosed = option.closePrice !== undefined;

  return (
    <TouchableOpacity
      onPress={() => router.push(`/option/${encodeURIComponent(option._id)}`)}
      style={[styles.card, hasExpired && styles.expired]}
    >
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{option.name}</Text>
        <StatusTag hasExpired={hasExpired} isClosed={isClosed} />
      </View>
      <Text>
        <Text>{formatDateToYYYYMMDD(option.expirationDate)}</Text>
        {` `}
        <Text style={styles.italicText}>{`${option.strikePrice.toFixed(
          2,
        )}${option.optionType === "put" ? "P" : "C"}`}</Text>
      </Text>
      <Text>
        <Text>{option.tradingType.toLocaleUpperCase()}</Text>{" "}
        <Text>{`$${option.premium.toFixed(2)}`}</Text>
      </Text>
    </TouchableOpacity>
  );
};

export default OptionCard;

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: "row",
    gap: 8,
  },
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
    elevation: 2.5,
  },
  italicText: {
    fontStyle: "italic",
  },
  expired: {
    opacity: 0.5,
  },
});
