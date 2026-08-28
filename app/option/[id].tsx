import CreateOrUpdateOptionModal from "@/components/CreateOrUpdateOptionModal";
import LoadingIndicator from "@/components/LoadingIndicator";
import StatusTag from "@/components/StatusTag";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { contractSize } from "@/styles/constants";
import { formatDateWithSeparator } from "@/utils/date.utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Option, OptionFormSection } from "../../types/types";

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
  const { id: routeId } = useLocalSearchParams<{ id?: string | string[] }>();
  const id = Array.isArray(routeId) ? routeId[0] : (routeId ?? "");

  const [editModalState, setEditModalState] = useState<{
    isOpen: boolean;
    section: OptionFormSection | null;
  }>({
    isOpen: false,
    section: null,
  });
  const dbOption = useQuery(api.options.getOptionById, {
    id: id as Id<"options">,
  });

  const option: Option | null = dbOption
    ? {
        id: dbOption._id,
        name: dbOption.name,
        premium: dbOption.premium,
        strikePrice: dbOption.strikePrice,
        expirationDate: dbOption.expirationDate,
        optionType: dbOption.optionType,
        tradingType: dbOption.tradingType,
        openFee: dbOption.openFee,
        closeFee: dbOption.closeFee,
        openDate: dbOption.openDate,
        closeDate: dbOption.closeDate
          ? new Date(dbOption.closeDate).toISOString()
          : undefined,
        closePrice: dbOption.closePrice,
      }
    : null;

  if (option === undefined) {
    return <LoadingIndicator />;
  }

  if (option === null) {
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
    openFee,
    closePrice,
    closeFee,
    closeDate,
  } = option;

  const profitOrLoss =
    tradingType === "short"
      ? premium - (closePrice ?? 0)
      : (closePrice ?? 0) - premium;
  const net = profitOrLoss - openFee - (closeFee ?? 0);

  const hasExpired = new Date(expirationDate) < new Date();
  const isClosed = closePrice !== undefined;

  const optionDetails = [
    {
      label: "Type",
      value: optionType.toLocaleUpperCase(),
    },
    { label: "Strike Price", value: `$${strikePrice.toFixed(2)}` },
    { label: "Premium", value: `$${premium.toFixed(2)}` },
    {
      label: "Expiration",
      value: formatDateWithSeparator(expirationDate),
      valueStyle: hasExpired ? styles.expiredValue : undefined,
    },
  ];

  const tradingDetails = [
    {
      label: "Trading Type",
      value: tradingType.toLocaleUpperCase(),
    },
    {
      label: "Open Price",
      value: `$${premium.toFixed(2)}`,
    },
    {
      label: "Close Price",
      value: closePrice ? `$${closePrice.toFixed(2)}` : "-",
    },
    {
      label: "Open Fee",
      value: `$${openFee.toFixed(2)}`,
    },
    {
      label: "Close Fee",
      value: closeFee ? `$${closeFee.toFixed(2)}` : "-",
    },
    {
      label: "Open Date",
      value: openDate ? formatDateWithSeparator(openDate) : "-",
    },
    {
      label: "Close Date",
      value: closeDate ? formatDateWithSeparator(closeDate) : "-",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.summaryContainer}>
          <View>
            <Text style={styles.title}>{name}</Text>
            <StatusTag hasExpired={hasExpired} isClosed={isClosed} />
          </View>
          <DetailItemLayout
            label="Profit/Loss (USD)"
            value={`$${net.toFixed(2)}`}
            labelStyle={styles.darkLabel}
          />
          <DetailItemLayout
            label="ROI"
            value={`${((net / (strikePrice * contractSize)) * 100).toFixed(2)}%`}
            labelStyle={styles.darkLabel}
          />
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Option Details</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Edit option"
              onPress={() =>
                setEditModalState({ isOpen: true, section: "option" })
              }
              style={styles.editButton}
            >
              <Ionicons name="pencil" size={18} color="#1f2937" />
            </Pressable>
          </View>
          <View style={styles.detailsContainer}>
            {optionDetails.map((item) => (
              <View key={item.label} style={styles.detailRow}>
                <DetailItemLayout
                  label={item.label}
                  value={item.value}
                  valueStyle={item.valueStyle}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Trading Details</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Edit option"
              onPress={() =>
                setEditModalState({ isOpen: true, section: "trading" })
              }
              style={styles.editButton}
            >
              <Ionicons name="pencil" size={16} color="#1f2937" />
            </Pressable>
          </View>
          <View style={styles.detailsContainer}>
            {tradingDetails.map((item) => (
              <View key={item.label} style={styles.detailRow}>
                <DetailItemLayout label={item.label} value={item.value} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <CreateOrUpdateOptionModal
        isOpen={editModalState.isOpen}
        onClose={() => setEditModalState({ isOpen: false, section: null })}
        option={option}
        section={editModalState.section}
      />
    </SafeAreaView>
  );
};

export default OptionDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  statusTagLabel: {
    fontSize: 12,
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 19,
    backgroundColor: "#dbeafe",
    alignItems: "center",
    justifyContent: "center",
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
  detailRow: {
    marginBottom: 12,
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
