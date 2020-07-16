import * as React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { creatorContentType } from "../redux/contentSlice";

export interface CreatorContentCardProps extends creatorContentType {
  // goCreatorProfile: (cid: string) => void;
}
const CreatorContentCard: React.SFC<CreatorContentCardProps> = ({
  content,
  coverUrl,
  createdAt,
  creatorId,
  creatorName,
  creatorPicUrl,
  contentId,
  title,
  type,
}) => {
  const pic = coverUrl
    ? { uri: coverUrl }
    : require("../assets/images/favicon.png");
  return (
    <TouchableWithoutFeedback /*  onPress={() => goCreatorProfile(creatorId)} */
    >
      <View style={styles.container}>
        <Image source={pic} style={styles.imageProfile} />
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "cyan",
  },
  imageProfile: {
    width: 50,
    height: 50,
    margin: 20,
  },
  text: {
    fontSize: 10,
    margin: 10,
  },
});

export default CreatorContentCard;
