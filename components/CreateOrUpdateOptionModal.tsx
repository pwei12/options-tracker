import { api } from "@/convex/_generated/api";
import { OptionFormValues } from "@/types/types";
import { toDbDateString } from "@/utils/date.utils";
import { useMutation } from "convex/react";
import React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import OptionForm from "./OptionForm";

const CreateOrUpdateOptionModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const createOption = useMutation(api.options.createOption);

  const handleCreateOption = async (values: OptionFormValues) => {
    const trimmedName = values.name.trim();
    const premium = Number(values.premium);
    const strikePrice = Number(values.strikePrice);
    const fee = Number(values.fee);
    const expirationDate = toDbDateString(values.expirationDate); //new Date(values.expirationDate).getTime();
    const openDate = toDbDateString(values.openDate); //new Date(values.openDate).getTime();

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

    if (!values.fee) {
      Alert.alert("Missing details", "Please enter the fee.");
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
    try {
      await createOption({
        name: trimmedName,
        premium,
        strikePrice,
        expirationDate,
        optionType: values.optionType,
        tradingType: values.tradingType,
        fee,
        openDate,
      });

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
        <View style={styles.modalCard}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>New Option</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </Pressable>
          </View>
          <OptionForm onSubmit={handleCreateOption} />
        </View>
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
