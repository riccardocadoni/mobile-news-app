import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  createButton: {
    alignItems: "center",
    backgroundColor: "orange",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 250,
    marginTop: 80,
  },
});
