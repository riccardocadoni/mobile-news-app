import * as React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { PRIMARY_COLOR } from "../constants/Colors";

export interface LoadingProps {}

const Loading: React.SFC<LoadingProps> = () => {
  return (
    <View style={[styles.container]}>
      <ActivityIndicator size="large" color={PRIMARY_COLOR} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
