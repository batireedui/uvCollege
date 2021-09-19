import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = ({ title, subTitle }) => (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitle}>{subTitle}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 25,

  },
  titleContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    textTransform: "uppercase",
  },
  subtitleContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
    textAlign: "center",
  },
  subtitle: {
    fontWeight: "300",
    fontSize: 12,
    textAlign: "center",
  },
});

export default Header;
