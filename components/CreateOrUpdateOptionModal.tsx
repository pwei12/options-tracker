import { api } from "@/convex/_generated/api";
import { Option, OptionFormSection, OptionFormValues } from "@/types/types";
import { toDbDateString } from "@/utils/date.utils";
import { useMutation } from "convex/react";
import capitalize from "lodash/capitalize";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
} from "react-native";
import OptionForm from "./OptionForm";
import { HStack } from "./ui/hstack";
import { Pressable } from "./ui/pressable";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

type CreateOrUpdateOptionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  option?: Option;
  section?: OptionFormSection | null;
};

const CreateOrUpdateOptionModal = ({
  isOpen,
  onClose,
  option,
  section,
}: CreateOrUpdateOptionModalProps) => {
  const createOption = useMutation(api.options.createOption);
  const updateOption = useMutation(api.options.updateOption);

  const initialValues = option
    ? {
        name: option.name,
        premium: option.premium.toString(),
        strikePrice: option.strikePrice.toString(),
        expirationDate: new Date(option.expirationDate),
        openFee: (option.openFee ?? 0).toString(),
        openDate: new Date(option.openDate),
        closePrice: option.closePrice
          ? option.closePrice.toString()
          : undefined,
        closeFee: option.closeFee ? option.closeFee.toString() : undefined,
        closeDate: option.closeDate ? new Date(option.closeDate) : undefined,
        optionType: option.optionType,
        tradingType: option.tradingType,
      }
    : undefined;

  const handleCreateOrUpdateOption = async (values: OptionFormValues) => {
    const trimmedName = values.name.trim();
    const premium = Number(values.premium);
    const strikePrice = Number(values.strikePrice);
    const openFee = Number(values.openFee);
    const closeFee = values.closeFee ? Number(values.closeFee) : undefined;
    const closePrice = values.closePrice
      ? Number(values.closePrice)
      : undefined;
    const expirationDate = toDbDateString(values.expirationDate);
    const openDate = toDbDateString(values.openDate);
    const closeDate = values.closeDate
      ? toDbDateString(values.closeDate)
      : undefined;

    if (!trimmedName) {
      Alert.alert("Missing details", "Please enter the option symbol.");
      return;
    }

    if (!values.expirationDate) {
      Alert.alert("Missing details", "Please enter the expiration date.");
      return;
    }

    if (!values.premium) {
      Alert.alert("Missing details", "Please enter the premium.");
      return;
    }

    if (!values.strikePrice) {
      Alert.alert("Missing details", "Please enter the strike price.");
      return;
    }

    if (!values.openFee) {
      Alert.alert("Missing details", "Please enter the open fee.");
      return;
    }

    if (!Number.isFinite(premium)) {
      Alert.alert("Invalid values", "Premium must be a valid number.");
      return;
    }

    if (!Number.isFinite(strikePrice)) {
      Alert.alert("Invalid values", "Strike price must be a valid number.");
      return;
    }

    const createData = {
      name: trimmedName,
      premium,
      strikePrice,
      expirationDate,
      optionType: values.optionType,
      tradingType: values.tradingType,
      openFee,
      openDate,
      closePrice,
      closeFee,
      closeDate,
    };

    if (option) {
      const updateData =
        section === "option"
          ? {
              name: trimmedName,
              premium,
              strikePrice,
              expirationDate,
              optionType: values.optionType,
            }
          : section === "trading"
            ? {
                tradingType: values.tradingType,
                openFee,
                openDate,
                closePrice,
                closeFee,
                closeDate,
              }
            : createData;

      try {
        await updateOption({
          id: option.id,
          update: updateData,
        });
        onClose();
        return;
      } catch {
        Alert.alert("Failed to update the option");
        return;
      }
    }

    try {
      await createOption(createData);
      onClose();
    } catch {
      Alert.alert("Failed to create new option");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isOpen}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.modalOverlay}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <VStack className="bg-muted rounded-t-3xl p-5 max-h-[90%]">
          <HStack className="justify-between items-center mb-3">
            <Text className="text-2xl font-bold text-muted-foreground">
              {option && section
                ? `${capitalize(section)} Details`
                : option
                  ? "Edit option"
                  : "New Option"}
            </Text>
            <Pressable
              onPress={onClose}
              className="w-8 h-8 rounded-full bg-muted/50 items-center justify-center"
            >
              <Text className="text-2xl text-muted-foreground">×</Text>
            </Pressable>
          </HStack>
          <OptionForm
            onSubmit={handleCreateOrUpdateOption}
            initialValues={initialValues}
            section={section}
          />
        </VStack>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CreateOrUpdateOptionModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(15, 23, 42, 0.45)",
  },
  modalCard: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 18,
    paddingBottom: 28,
    maxHeight: "90%",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: "#111827",
    lineHeight: 24,
  },
});
