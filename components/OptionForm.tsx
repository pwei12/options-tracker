import { placeholderColor } from "@/styles/constants";
import {
  optionFormSchema,
  OptionFormSection,
  OptionFormValues,
  optionTypeValues,
  tradingTypeValues,
} from "@/types/types";
import { getToday } from "@/utils/date.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import DatePickerInput from "./DatePickerInput";
import FormLabel from "./FormLabel";
import { HStack } from "./ui/hstack";
import { Input, InputField } from "./ui/input";
import { Pressable } from "./ui/pressable";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

const defaultFormValues: OptionFormValues = {
  name: "",
  premium: "",
  strikePrice: "",
  expirationDate: getToday(),
  openFee: "",
  openDate: getToday(),
  optionType: "call",
  tradingType: "long",
  closePrice: undefined,
  closeFee: undefined,
  closeDate: undefined,
};

type OptionFormProps = {
  onSubmit: (values: OptionFormValues) => Promise<void>;
  initialValues?: Partial<OptionFormValues>;
  section?: OptionFormSection | null;
};

const OptionForm = ({ onSubmit, initialValues, section }: OptionFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<OptionFormValues>({
    resolver: zodResolver(optionFormSchema),
    defaultValues: defaultFormValues,
  });

  const selectedOptionType = watch("optionType");
  const selectedTradingType = watch("tradingType");
  const isOptionDetailsSection = section === "option";
  const isTradingDetailsSection = section === "trading";

  useEffect(() => {
    reset(initialValues ?? defaultFormValues);
  }, [initialValues, reset]);

  return (
    <VStack className="pb-4">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 4 }}
      >
        {(!section || isOptionDetailsSection) && (
          <VStack className="mb-4">
            <FormLabel label="Symbol" isRequired style="mb-1" />
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputField
                    value={value}
                    placeholder="AAPL"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="characters"
                    placeholderTextColor={placeholderColor}
                  />
                </Input>
              )}
            />
            {errors.name && (
              <Text className="text-destructive">{errors.name.message}</Text>
            )}
          </VStack>
        )}

        {(!section || isOptionDetailsSection) && (
          <VStack className="mb-4">
            <FormLabel label="Premium (USD)" isRequired />
            <Controller
              control={control}
              name="premium"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputField
                    value={value}
                    placeholder="12.50"
                    keyboardType="decimal-pad"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholderTextColor={placeholderColor}
                  />
                </Input>
              )}
            />
            {errors.premium && (
              <Text className="text-destructive">{errors.premium.message}</Text>
            )}
          </VStack>
        )}

        {(!section || isOptionDetailsSection) && (
          <VStack className="mb-4">
            <FormLabel label="Strike Price" isRequired />
            <Controller
              control={control}
              name="strikePrice"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="bg-input">
                  <InputField
                    value={value}
                    placeholder="220.00"
                    keyboardType="decimal-pad"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholderTextColor={placeholderColor}
                  />
                </Input>
              )}
            />
            {errors.strikePrice && (
              <Text className="text-destructive">
                {errors.strikePrice.message}
              </Text>
            )}
          </VStack>
        )}

        {(!section || isOptionDetailsSection) && (
          <VStack className="mb-4">
            <FormLabel label="Expiration Date" isRequired />
            <Controller
              control={control}
              name="expirationDate"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <DatePickerInput
                  value={value}
                  onChange={onChange}
                  error={error?.message}
                />
              )}
            />
            {errors.expirationDate && (
              <Text className="text-destructive">
                {errors.expirationDate.message}
              </Text>
            )}
          </VStack>
        )}

        {(!section || isTradingDetailsSection) && (
          <VStack className="mb-4">
            <FormLabel label="Open fee (USD)" isRequired />
            <Controller
              control={control}
              name="openFee"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="bg-input">
                  <InputField
                    value={value}
                    placeholder="1.53"
                    keyboardType="decimal-pad"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholderTextColor={placeholderColor}
                  />
                </Input>
              )}
            />
            {errors.openFee && (
              <Text className="text-destructive">{errors.openFee.message}</Text>
            )}
          </VStack>
        )}

        {(!section || isTradingDetailsSection) && (
          <VStack className="mb-4">
            <FormLabel label="Open Date" isRequired />
            <Controller
              control={control}
              name="openDate"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <DatePickerInput
                  value={value}
                  onChange={onChange}
                  error={error?.message}
                />
              )}
            />
            {errors.openDate && (
              <Text className="text-destructive">
                {errors.openDate.message}
              </Text>
            )}
          </VStack>
        )}

        {(!section || isTradingDetailsSection) && (
          <VStack className="mb-4">
            <FormLabel label="Close price (USD)" />
            <Controller
              control={control}
              name="closePrice"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="bg-input">
                  <InputField
                    value={value}
                    placeholder="1.53"
                    keyboardType="decimal-pad"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholderTextColor={placeholderColor}
                  />
                </Input>
              )}
            />
            {errors.closePrice && (
              <Text className="text-destructive">
                {errors.closePrice.message}
              </Text>
            )}
          </VStack>
        )}

        {(!section || isTradingDetailsSection) && (
          <VStack className="mb-4">
            <FormLabel label="Close fee (USD)" />
            <Controller
              control={control}
              name="closeFee"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="bg-input">
                  <InputField
                    value={value}
                    placeholder="1.53"
                    keyboardType="decimal-pad"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholderTextColor={placeholderColor}
                  />
                </Input>
              )}
            />
            {errors.closeFee && (
              <Text className="text-destructive">
                {errors.closeFee.message}
              </Text>
            )}
          </VStack>
        )}

        {(!section || isTradingDetailsSection) && (
          <VStack className="mb-4">
            <FormLabel label="Close Date" />
            <Controller
              control={control}
              name="closeDate"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <DatePickerInput
                  value={value}
                  onChange={onChange}
                  error={error?.message}
                />
              )}
            />
            {errors.closeDate && (
              <Text className="text-destructive">
                {errors.closeDate.message}
              </Text>
            )}
          </VStack>
        )}

        {(!section || isOptionDetailsSection) && (
          <VStack className="mb-4">
            <FormLabel label="Option Type" isRequired />
            <HStack className="gap-2">
              {optionTypeValues.map((optionType) => (
                <Pressable
                  key={optionType}
                  onPress={() =>
                    setValue("optionType", optionType, { shouldValidate: true })
                  }
                  className={`flex-1 border rounded-lg py-3 items-center ${
                    selectedOptionType === optionType
                      ? "bg-primary border-primary"
                      : "bg-foreground border-foreground"
                  }`}
                >
                  <Text
                    className={`font-semibold ${
                      selectedOptionType === optionType
                        ? "text-foreground"
                        : "text-secondary"
                    }`}
                  >
                    {optionType.toUpperCase()}
                  </Text>
                </Pressable>
              ))}
            </HStack>
          </VStack>
        )}

        {(!section || isTradingDetailsSection) && (
          <VStack className="mb-4">
            <FormLabel label="Position Type" isRequired />
            <HStack className="gap-2">
              {tradingTypeValues.map((tradingType) => (
                <Pressable
                  key={tradingType}
                  onPress={() =>
                    setValue("tradingType", tradingType, {
                      shouldValidate: true,
                    })
                  }
                  className={`flex-1 border rounded-lg py-3 items-center ${
                    selectedTradingType === tradingType
                      ? "bg-primary border-primary"
                      : "bg-foreground border-foreground"
                  }`}
                >
                  <Text
                    className={`font-semibold ${
                      selectedTradingType === tradingType
                        ? "text-foreground"
                        : "text-secondary"
                    }`}
                  >
                    {tradingType.toUpperCase()}
                  </Text>
                </Pressable>
              ))}
            </HStack>
          </VStack>
        )}
      </ScrollView>
      <Pressable
        onPress={handleSubmit(onSubmit)}
        className="bg-primary rounded-lg py-3 items-center "
      >
        <Text className="text-foreground font-semibold">
          {initialValues ? "Update" : "Create"}
        </Text>
      </Pressable>
    </VStack>
  );
};

export default OptionForm;
