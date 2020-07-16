import * as React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

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
        <Image source={pic} style={styles.imageProfile} />
        <Text style={styles.text}>{firstName + " " + lastName}</Text>
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
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 20,
  },
  text: {
    fontSize: 20,
    margin: 10,
  },
});

export default CreatorCard;
