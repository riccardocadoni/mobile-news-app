import * as React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { BACKGROUND_COLOR } from "../constants/Colors";
import { REGULAR_FONT } from "../constants/Font";

export interface CreatorCardProps {
  firstName: string;
  lastName: string;
  fields?: string[];
  creatorId: string;
  profilePic?: string;
  goCreatorProfile: (cid: string) => void;
}

const CreatorCard: React.SFC<CreatorCardProps> = ({
  firstName,
  lastName,
  profilePic,
  creatorId,
  goCreatorProfile,
}) => {
  const pic = profilePic
    ? { uri: profilePic }
    : require("../assets/images/favicon.png");
  return (
    <TouchableWithoutFeedback onPress={() => goCreatorProfile(creatorId)}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={pic} style={styles.imageProfile} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{firstName}</Text>
          <Text style={styles.text}>{lastName}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    margin: 5,
    borderRadius: 20,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageProfile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
  },
  textContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 15,
    marginBottom: 15,
  },
  text: {
    fontSize: 20,
    fontFamily: REGULAR_FONT,
  },
});

export default CreatorCard;
