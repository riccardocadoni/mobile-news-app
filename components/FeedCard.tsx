import * as React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native"; //type
import { FeedNavigationProp } from "../types";
import { CreatorContentType } from "../redux/contentSlice";
import TimeAgo from "react-native-timeago";

export interface FeedCardProps extends CreatorContentType {
  navigation: FeedNavigationProp;
}
const FeedCard: React.SFC<FeedCardProps> = ({
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
  const creatorPic = creatorPicUrl
    ? { uri: creatorPicUrl }
    : require("../assets/images/favicon.png"); //TODO placeolder

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
        <View style={styles.infoCardContainer}>
          <View style={styles.infoCreatorContainer}>
            <Image source={creatorPic} style={styles.imageCreator} />
            <Text style={styles.title}>{creatorName}</Text>
          </View>
          <Text style={styles.date}>
            <TimeAgo time={JSON.parse(createdAt)}></TimeAgo>
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={pic} style={styles.image} />
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.title} numberOfLines={3}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 5,
    justifyContent: "center",
  },
  infoCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },
  infoCreatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
  },
  dataContainer: {
    textAlign: "center",
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  imageCreator: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 4,
  },
  date: {
    fontSize: 15,
  },
});

export default FeedCard;
