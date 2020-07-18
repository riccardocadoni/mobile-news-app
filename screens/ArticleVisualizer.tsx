import * as React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import getRNDraftJSBlocks from "react-native-draftjs-render";
//types
import { CreatorContentType } from "../redux/contentSlice";
import { ArticleVisualizerRouteProp } from "../types";

export interface ArticleVisualizerProps extends CreatorContentType {
  route: ArticleVisualizerRouteProp;
}

const ArticleVisualizer: React.SFC<ArticleVisualizerProps> = ({ route }) => {
  const { content } = route.params;
  const contentState = JSON.parse(content);
  const blocks = getRNDraftJSBlocks({ contentState });
  return <ScrollView style={styles.container}>{blocks}</ScrollView>;
};

export default ArticleVisualizer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileInfoContainer: {
    flexDirection: "row",
    backgroundColor: "#9FA8DA",
    padding: 30,
  },
  textInfoContainer: { backgroundColor: "#9FA8DA" },
  followingInfoContainer: {
    flex: 1,
  },
  cardsContainer: {
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
    margin: 10,
  },
  imageProfile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 20,
  },
  logOutBtn: {
    alignItems: "center",
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 10,
  },
});
