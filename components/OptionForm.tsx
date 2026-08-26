import { placeholderColor } from "@/styles/constants";
import {
    optionFormSchema,
    OptionFormValues,
    optionTypeValues,
    tradingTypeValues,
} from "@/types/types";
import { getToday } from "@/utils/date.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import DatePickerInput from "./DatePickerInput";
import FormLabel from "./FormLabel";

type OptionFormProps = {
  onSubmit: (values: OptionFormValues) => Promise<void>;
};

const OptionForm = ({ onSubmit }: OptionFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<OptionFormValues>({
    resolver: zodResolver(optionFormSchema),
    defaultValues: {
      name: "",
      premium: "",
      strikePrice: "",
      expirationDate: getToday(),
      fee: "",
      optionType: "call",
      tradingType: "long",
      openDate: getToday(),
    },
  });
  console.log("form errors", errors);

  const selectedOptionType = watch("optionType");
  const selectedTradingType = watch("tradingType");

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.formContent}
      >
        <View style={styles.fieldGroup}>
          <FormLabel label="Symbol" isRequired />
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="characters"
                placeholder="AAPL"
                placeholderTextColor={placeholderColor}
                style={styles.input}
              />
            )}
          />
          {errors.name && (
            <Text style={styles.errorText}>{errors.name.message}</Text>
          )}
        </View>

        <View style={styles.fieldGroup}>
          <FormLabel label="Premium (USD)" isRequired />
          <Controller
            control={control}
            name="premium"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType="decimal-pad"
                value={value}
                placeholder="12.50"
                placeholderTextColor={placeholderColor}
                style={styles.input}
              />
            )}
          />
          {errors.premium && (
            <Text style={styles.errorText}>{errors.premium.message}</Text>
          )}
        </View>

        <View style={styles.fieldGroup}>
          <FormLabel label="Strike Price" isRequired />
          <Controller
            control={control}
            name="strikePrice"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="decimal-pad"
                placeholder="220.00"
                placeholderTextColor={placeholderColor}
                style={styles.input}
              />
            )}
          />
          {errors.strikePrice && (
            <Text style={styles.errorText}>{errors.strikePrice.message}</Text>
          )}
        </View>

        <View style={styles.fieldGroup}>
          <FormLabel label="Fee (USD)" isRequired />
          <Controller
            control={control}
            name="fee"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="decimal-pad"
                placeholder="1.53"
                placeholderTextColor={placeholderColor}
                style={styles.input}
              />
            )}
          />
          {errors.fee && (
            <Text style={styles.errorText}>{errors.fee.message}</Text>
          )}
        </View>

        <View style={styles.fieldGroup}>
          <FormLabel label="Expiration Date" isRequired />
          <Controller
            control={control}
            name="expirationDate"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePickerInput
                value={value}
                onChange={onChange}
                error={error?.message}
                maximumDate={new Date()}
              />
            )}
          />
          {errors.expirationDate && (
            <Text style={styles.errorText}>
              {errors.expirationDate.message}
            </Text>
          )}
        </View>

        <View style={styles.fieldGroup}>
          <FormLabel label="Open Date" isRequired />
          <Controller
            control={control}
            name="openDate"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePickerInput
                value={value}
                onChange={onChange}
                error={error?.message}
                maximumDate={new Date()}
              />
            )}
          />
          {errors.openDate && (
            <Text style={styles.errorText}>{errors.openDate.message}</Text>
          )}
        </View>

        <View style={styles.fieldGroup}>
          <FormLabel label="Option Type" isRequired />
          <View style={styles.optionRow}>
            {optionTypeValues.map((optionType) => (
              <Pressable
                key={optionType}
                onPress={() =>
                  setValue("optionType", optionType, { shouldValidate: true })
                }
                style={[
                  styles.optionButton,
                  selectedOptionType === optionType &&
                    styles.optionButtonSelected,
                ]}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    selectedOptionType === optionType &&
                      styles.optionButtonTextSelected,
                  ]}
                >
                  {optionType.toUpperCase()}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <FormLabel label="Trade Type" isRequired />
          <View style={styles.optionRow}>
            {tradingTypeValues.map((tradingType) => (
              <Pressable
                key={tradingType}
                onPress={() =>
                  setValue("tradingType", tradingType, { shouldValidate: true })
                }
                style={[
                  styles.optionButton,
                  selectedTradingType === tradingType &&
                    styles.optionButtonSelected,
                ]}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    selectedTradingType === tradingType &&
                      styles.optionButtonTextSelected,
                  ]}
                >
                  {tradingType.toUpperCase()}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
      <Pressable onPress={handleSubmit(onSubmit)} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Create</Text>
      </Pressable>
    </View>
  );
};

export default OptionForm;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 96,
  },
  formContent: {
    paddingBottom: 16,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  //   label: {
  //     fontSize: 14,
  //     fontWeight: "600",
  //     color: "#374151",
  //     marginBottom: 8,
  //   },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#f9fafb",
  },
  optionRow: {
    flexDirection: "row",
    gap: 8,
  },
  optionButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  optionButtonSelected: {
    backgroundColor: "#4c7cec",
    borderColor: "#4c7cec",
  },
  optionButtonText: {
    color: "#111827",
    fontWeight: "600",
  },
  optionButtonTextSelected: {
    color: "#ffffff",
  },
  submitButton: {
    backgroundColor: "#4c7cec",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  errorText: {
    fontSize: 12,
    color: "red",
  },
});
