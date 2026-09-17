import { normalizeDate } from "@/utils/date.utils";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform } from "react-native";
import { Pressable } from "./ui/pressable";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

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
    <VStack className="gap-1">
      <Pressable
        accessibilityRole="button"
        accessibilityHint="Opens date picker"
        accessibilityState={{
          disabled,
        }}
        disabled={disabled}
        onPress={handlePress}
        className={`flex-row items-center justify-between px-3 py-2 border border-border rounded-lg dark:bg-input/30 bg-transparent ${disabled ? "opacity-50" : ""} ${
          error ? "border-destructive" : ""
        }`}
      >
        <Text className={value ? "text-muted-foreground" : "text-muted"}>
          {formattedDate}
        </Text>

        <Text className="text-xl">📅</Text>
      </Pressable>

      {error && (
        <Text accessibilityRole="alert" className="text-destructive text-sm">
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
    </VStack>
  );
};

export default DatePickerInput;
