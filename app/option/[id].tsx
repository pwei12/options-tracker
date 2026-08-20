import { options } from "@/constants/mock_data";
import { formatDateWithSeparator } from "@/utils/formatDate";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OptionType, TradingType } from "../../types/types";

const DetailItemLayout = ({
  label,
  value,
  labelStyle,
  valueStyle,
}: {
  label: string;
  value: string;
  labelStyle?: object;
  valueStyle?: object;
}) => {
  return (
    <View>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <Text style={valueStyle}>{value}</Text>
    </View>
  );
};

const OptionDetail = () => {
  const { id } = useLocalSearchParams();
  //   TODO: query the option by id from the database instead of using mock data
  const option = options.find((o) => o.id === id);

  if (!option) {
    return (
      <View style={styles.container}>
        <Text>Option not found</Text>
      </View>
    );
  }

  const {
    name,
    premium,
    strikePrice,
    expirationDate,
    optionType,
    tradingType,
    openDate,
    closeDate,
    closePrice,
  } = option;

  const net =
    tradingType === TradingType.SHORT
      ? premium - (closePrice ?? 0)
      : (closePrice ?? 0) - premium;

  const isExpired = new Date(expirationDate) < new Date();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.summaryContainer}>
        <Text style={styles.title}>{name}</Text>
        <DetailItemLayout
          label="Profit/Loss (USD)"
          value={`$${net.toFixed(2)}`}
          labelStyle={styles.darkLabel}
        />
        <DetailItemLayout
          label="ROI"
          value={`${((net / strikePrice) * 100).toFixed(2)}%`}
          labelStyle={styles.darkLabel}
        />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Option Details</Text>
        <FlatList
          keyExtractor={(item) => item.label}
          data={[
            {
              label: "Type",
              value: optionType === OptionType.PUT ? "Put" : "Call",
            },
            { label: "Strike Price", value: `$${strikePrice.toFixed(2)}` },
            { label: "Premium", value: `$${premium.toFixed(2)}` },
            {
              label: "Expiration",
              value: formatDateWithSeparator(expirationDate),
              valueStyle: isExpired ? styles.expiredValue : undefined,
            },
          ]}
          renderItem={({ item }) => (
            <DetailItemLayout
              label={item.label}
              value={item.value}
              valueStyle={item.valueStyle}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          style={styles.detailsContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Trading Details</Text>
        <FlatList
          keyExtractor={(item) => item.label}
          data={[
            {
              label: "Open Price",
              value: `$${premium.toFixed(2)}`,
            },
            {
              label: "Close Price",
              value: closePrice ? `$${closePrice.toFixed(2)}` : "-",
            },
            {
              label: "Trading Type",
              value: tradingType === TradingType.SHORT ? "Short" : "Long",
            },
            {
              label: "Open Date",
              value: openDate ? formatDateWithSeparator(openDate) : "-",
            },
            {
              label: "Close Date",
              value: closeDate ? formatDateWithSeparator(closeDate) : "-",
            },
          ]}
          renderItem={({ item }) => (
            <DetailItemLayout label={item.label} value={item.value} />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          style={styles.detailsContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default OptionDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginVertical: 16,
    backgroundColor: "#9abaf5",
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
  sectionContainer: {
    marginVertical: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 12,
  },
  detailsContainer: {
    backgroundColor: "#f9f9f9",
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
  label: {
    fontSize: 12,
    color: "gray",
  },
  darkLabel: { color: "#4d4b4b" },
  expiredValue: {
    color: "red",
  },
});
