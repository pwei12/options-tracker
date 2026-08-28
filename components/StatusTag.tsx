import React from "react";
import { StyleSheet, Text, View } from "react-native";

type StatusTagProps = {
  hasExpired: boolean;
  isClosed: boolean;
};
const StatusTag = ({ hasExpired, isClosed }: StatusTagProps) => {
  if (!hasExpired && !isClosed) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{isClosed ? "Closed" : "Expired"}</Text>
    </View>
  );
};

export default StatusTag;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderColor: "#494949",
    backgroundColor: "#b7b7b7",
    paddingHorizontal: 8,
    justifyContent: "center",
    height: 18,
  },
  label: {
    color: "#494949",
    fontSize: 10,
  },
});
