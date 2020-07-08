import * as React from "react";
import { StyleSheet } from "react-native";

import { TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";

import { logUserOut } from "../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
export default function FeedScreen() {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed</Text>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => {
          dispatch(logUserOut());
        }}
      >
        <Text>LogOut</Text>
      </TouchableOpacity>
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
