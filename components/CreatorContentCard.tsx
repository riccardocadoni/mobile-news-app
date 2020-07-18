import * as React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native"; //type
import { CreatorProfileNavigationProp } from "../types";
import { CreatorContentType } from "../redux/contentSlice";
import TimeAgo from "react-native-timeago";

export interface CreatorContentCardProps extends CreatorContentType {
  navigation: CreatorProfileNavigationProp;
}
const CreatorContentCard: React.SFC<CreatorContentCardProps> = ({
  content,
  coverUrl,
  createdAt,
  editedAt,
  creatorId,
  creatorName,
  creatorPicUrl,
  contentId,
  title,
  type,
  navigation,
}) => {
  const pic = coverUrl
    ? { uri: coverUrl }
    : require("../assets/images/favicon.png");

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("ArticleVisualizer", {
          content,
          coverUrl,
          createdAt,
          editedAt,
          creatorId,
          creatorName,
          creatorPicUrl,
          contentId,
          title,
          type,
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={pic} style={styles.imageProfile} />
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.title} numberOfLines={3}>
            {title}
          </Text>
          <Text style={styles.date}>
            <TimeAgo time={JSON.parse(createdAt)}></TimeAgo>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  imageProfile: {
    width: 90,
    height: 80,
    borderRadius: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  date: {
    fontSize: 15,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    margin: 20,
  },
  dataContainer: {
    textAlign: "center",
    margin: 10,
    flexDirection: "column",
    justifyContent: "space-around",
    flex: 3,
  },
});

export default CreatorContentCard;
