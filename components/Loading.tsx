import * as React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

export interface LoadingProps {}

const Loading: React.SFC<LoadingProps> = () => {
  return (
    <View style={[styles.container]}>
      <ActivityIndicator size="large" color="#00ff00" />
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
