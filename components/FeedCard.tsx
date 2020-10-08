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
import { REGULAR_FONT, BOLD_FONT } from "../constants/Font";
import { BACKGROUND_COLOR } from "../constants/Colors";

export interface FeedCardProps extends CreatorContentType {
  navigation: FeedNavigationProp;
}
const FeedCard: React.FC<FeedCardProps> = ({
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
            <Text style={styles.nameCreator}>{creatorName}</Text>
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
    marginTop: 15,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: BACKGROUND_COLOR,
  },
  infoCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 15,
  },
  infoCreatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  imageCreator: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  nameCreator: {
    fontSize: 18,
    fontFamily: REGULAR_FONT,
  },
  date: {
    fontSize: 15,
    fontFamily: REGULAR_FONT,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 15,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  dataContainer: {
    textAlign: "center",
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 15,
    marginTop: 5,
  },
  title: {
    fontSize: 18,
    fontFamily: BOLD_FONT,
    margin: 4,
  },
});

export default FeedCard;
