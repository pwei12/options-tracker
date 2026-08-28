import { normalizeDate } from "@/utils/date.utils";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

type DatePickerProps = {
  value: Date | undefined;
  onChange: (date: Date) => void;
  error?: string;
  disabled?: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
  placeholder?: string;
};

const DatePickerInput = ({
  value,
  onChange,
  error,
  disabled = false,
  minimumDate,
  maximumDate,
  placeholder = "Select date",
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePress = () => {
    if (disabled) {
      return;
    }

    setIsOpen(true);
  };

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    /*
     * Android:
     * - "set" means the user selected a date
     * - "dismissed" means the user cancelled
     *
     * iOS:
     * The component behaves differently depending on
     * presentation, but selectedDate is still what we want.
     */

    if (Platform.OS === "android") {
      setIsOpen(false);
    }

    if (event.type === "set" && selectedDate) {
      onChange(normalizeDate(selectedDate));
    }
  };

  const handleDismiss = () => {
    setIsOpen(false);
  };

  const formattedDate = value
    ? new Intl.DateTimeFormat("en-Gb", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(value)
    : placeholder;

  return (
    <View>
      <Pressable
        accessibilityRole="button"
        accessibilityHint="Opens date picker"
        accessibilityState={{
          disabled,
        }}
        disabled={disabled}
        onPress={handlePress}
        style={[
          styles.input,
          disabled && styles.disabled,
          error && styles.inputError,
        ]}
      >
        <Text style={[styles.value, !value && styles.placeholder]}>
          {formattedDate}
        </Text>

        <Text style={styles.icon}>📅</Text>
      </Pressable>

      {error && (
        <Text accessibilityRole="alert" style={styles.error}>
          {error}
        </Text>
      )}

      {isOpen && (
        <DateTimePicker
          value={value ?? new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          onChange={handleChange}
          onTouchCancel={handleDismiss}
        />
      )}
    </View>
  );
};

export default DatePickerInput;

const styles = StyleSheet.create({
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  value: {
    fontSize: 16,
    color: "#111827",
  },
  placeholder: {
    color: "#9CA3AF",
  },
  icon: {
    fontSize: 18,
  },
  disabled: {
    opacity: 0.5,
  },
  inputError: {
    borderColor: "#DC2626",
  },
  error: {
    marginTop: 4,
    fontSize: 13,
    color: "#DC2626",
  },
});
