import { ComponentProps } from "react";
import { Text } from "./ui/text";

interface FormLabelProps {
  label: string;
  isRequired?: boolean;
  style?: ComponentProps<typeof Text>["className"];
}

const FormLabel = ({ label, isRequired = false, style }: FormLabelProps) => {
  return (
    <Text className={`font-medium text-md text-muted-foreground ${style}`}>
      {label} {isRequired && <Text className="text-destructive">*</Text>}
    </Text>
  );
};

export default FormLabel;
