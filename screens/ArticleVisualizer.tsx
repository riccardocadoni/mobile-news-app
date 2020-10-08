import * as React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import getRNDraftJSBlocks from "react-native-draftjs-render";
//types
import { CreatorContentType } from "../redux/contentSlice";
import { ArticleVisualizerRouteProp } from "../types";

export interface ArticleVisualizerProps extends CreatorContentType {
  route: ArticleVisualizerRouteProp;
}

const ArticleVisualizer: React.FC<ArticleVisualizerProps> = ({ route }) => {
  const { content } = route.params;
  if (!content)
    return (
      <View style={styles.container}>
        <Text>Article not found</Text>
      </View>
    );
  const contentState = content && JSON.parse(content);
  const blocks = getRNDraftJSBlocks({ contentState });
  return (
    <View style={styles.container}>
      <ScrollView>{blocks}</ScrollView>
    </View>
  );
};

export default ArticleVisualizer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
