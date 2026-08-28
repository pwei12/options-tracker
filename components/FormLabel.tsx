import { StyleSheet, Text, TextStyle } from "react-native";

interface FormLabelProps {
  label: string;
  isRequired?: boolean;
  style?: TextStyle;
}

const FormLabel = ({ label, isRequired = false, style }: FormLabelProps) => {
  return (
    <Text style={[styles.labelText, style]}>
      {label}
      {isRequired && <Text style={styles.asterisk}> *</Text>}
    </Text>
  );
};

export default FormLabel;

const styles = StyleSheet.create({
  labelText: {
    fontSize: 14,
    color: "#333333",
    fontWeight: "500",
    marginBottom: 4,
  },
  asterisk: {
    color: "#FF0000",
  },
});
