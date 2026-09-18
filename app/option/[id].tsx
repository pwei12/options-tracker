import CreateOrUpdateOptionModal from "@/components/CreateOrUpdateOptionModal";
import StatusTag from "@/components/StatusTag";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { contractSize } from "@/styles/constants";
import { formatDateWithSeparator, isDateExpired } from "@/utils/date.utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Option, OptionFormSection } from "../../types/types";

type SummaryCardProps = {
  name: string;
  net: number;
  strikePrice: number;
  hasExpired: boolean;
  isClosed: boolean;
};

const SummaryCard = ({
  name,
  net,
  strikePrice,
  hasExpired,
  isClosed,
}: SummaryCardProps) => {
  return (
    <HStack className="bg-secondary justify-between p-4 rounded-lg shadow-md">
      <VStack>
        <Text className="text-foreground text-2xl font-bold">{name}</Text>
        <StatusTag hasExpired={hasExpired} isClosed={isClosed} />
      </VStack>
      <DetailItemLayout
        label="Profit/Loss (USD)"
        value={`$${net.toFixed(2)}`}
        valueStyle="text-xl"
      />
      <DetailItemLayout
        label="ROI"
        value={`${((net / (strikePrice * contractSize)) * 100).toFixed(2)}%`}
        valueStyle="text-xl"
      />
    </HStack>
  );
};

const DetailItemLayout = ({
  label,
  value,
  labelStyle,
  valueStyle,
}: {
  label: string;
  value: string;
  labelStyle?: string;
  valueStyle?: string;
}) => {
  return (
    <VStack>
      <Text className={`text-card-muted text-xs ${labelStyle}`}>{label}</Text>
      <Text className={`text-sm ${valueStyle}`}>{value}</Text>
    </VStack>
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

  if (dbOption === undefined) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Spinner size="large" color="white" />
      </SafeAreaView>
    );
  }

  if (dbOption === null) {
    return (
      <SafeAreaView>
        <Text>Option not found</Text>
      </SafeAreaView>
    );
  }

  const option: Option = {
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
  };

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

  const hasExpired = isDateExpired(expirationDate);
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
      valueStyle: hasExpired ? "text-destructive" : undefined,
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <SummaryCard
          name={name}
          net={net}
          strikePrice={strikePrice}
          hasExpired={hasExpired}
          isClosed={isClosed}
        />
        <VStack className="mt-6 gap-2">
          <HStack className="justify-between items-center mb-2">
            <Text className="text-xl text-foreground font-semibold">
              Option Details
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Edit option"
              onPress={() =>
                setEditModalState({ isOpen: true, section: "option" })
              }
              className="w-8 h-8 rounded-full bg-accent justify-center items-center"
            >
              <Ionicons name="pencil" size={16} color="#ffffff" />
            </Pressable>
          </HStack>
          <VStack className="bg-primary p-4 rounded-lg shadow-md gap-3">
            {optionDetails.map((item) => (
              <DetailItemLayout
                key={item.label}
                label={item.label}
                value={item.value}
                valueStyle={item.valueStyle ? "text-destructive" : undefined}
              />
            ))}
          </VStack>
        </VStack>

        <VStack className="mt-6 gap-2 bg-card">
          <HStack className="justify-between items-center mb-2">
            <Text className="text-xl text-foreground font-semibold">
              Trading Details
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Edit option"
              onPress={() =>
                setEditModalState({ isOpen: true, section: "trading" })
              }
              className="w-8 h-8 rounded-full bg-accent justify-center items-center"
            >
              <Ionicons name="pencil" size={16} color="#ffffff" />
            </Pressable>
          </HStack>
          <VStack className="bg-primary p-4 rounded-lg shadow-md gap-3">
            {tradingDetails.map((item) => (
              <DetailItemLayout
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </VStack>
        </VStack>
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
