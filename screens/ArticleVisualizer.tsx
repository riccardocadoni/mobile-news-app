import * as React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import getRNDraftJSBlocks from "react-native-draftjs-render";
import { BOLD_FONT } from "../constants/Font";
//types
import { CreatorContentType } from "../redux/contentSlice";
import { ArticleVisualizerRouteProp } from "../types";

export interface ArticleVisualizerProps extends CreatorContentType {
  route: ArticleVisualizerRouteProp;
}

const ArticleVisualizer: React.FC<ArticleVisualizerProps> = ({ route }) => {
  const { content, title } = route.params;
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
      <ScrollView>
      <Text style={styles.title}>{title}</Text>
        {blocks}
      </ScrollView>
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
  title: {
    fontSize: 30,
    fontFamily: BOLD_FONT,
    marginBottom: 20,
  },
});
