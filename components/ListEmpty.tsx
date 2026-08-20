import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ListEmpty = ({
  message,
  containerStyle,
  messageStyle,
}: {
  message?: string;
  containerStyle?: object;
  messageStyle?: object;
}) => {
  return (
    <View style={[styles.emptyListContainer, containerStyle]}>
      <Text style={messageStyle}>{message ?? "No options available."}</Text>
    </View>
  );
};

export default ListEmpty;

const styles = StyleSheet.create({
  emptyListContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 100,
    width: "100%",
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
