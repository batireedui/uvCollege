import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("screen");

const MyButton = ({ title, onPress, background }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={[
        { backgroundColor: background || "#880e4f" },
        styles.button,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 10,
    borderRadius: 20,
    width: width/1.2,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default MyButton;
