import * as React from "react";
import { StyleSheet, Image } from "react-native";
import firebase from "../firebase";
import { Text, View } from "../components/Themed";
import { TouchableOpacity } from "react-native";
//type
import { ProfileNavigationProp } from "../types";
//redux
import { logUserOut } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { REGULAR_FONT, BOLD_FONT } from "../constants/Font";
import { PRIMARY_COLOR, BACKGROUND_COLOR } from "../constants/Colors";
import Following from "../components/Following";

export interface ProfileProps {
  navigation: ProfileNavigationProp;
}

const Profile: React.SFC<ProfileProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = firebase.auth().currentUser;

  const url: string | undefined = user?.photoURL ? user.photoURL : undefined;
  return (
    <View style={styles.container}>
      <View style={styles.profileInfoContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: url }} style={styles.imageProfile} />
        </View>
        <View style={styles.textInfoContainer}>
          <Text style={styles.textInfo}>{user?.displayName}</Text>
          <Text style={styles.textInfo}>{user?.email}</Text>
        </View>
      </View>
      <View style={styles.settingsContainer}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => {
            dispatch(logUserOut());
          }}
        >
          <Text>LogOut</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.followingContainer}>
        <Following user={user} navigation={navigation}></Following>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileInfoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  textInfoContainer: {
    flex: 6,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  textInfo: {
    fontSize: 25,
    fontFamily: REGULAR_FONT,
    color: PRIMARY_COLOR,
    margin: 5,
  },
  imageContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  imageProfile: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  followingContainer: {
    flex: 3,
  },
  cardsContainer: {
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
    fontFamily: BOLD_FONT,
    color: PRIMARY_COLOR,
    margin: 5,
  },
  settingsContainer: {
    alignItems: "center",
  },
  settingsButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BACKGROUND_COLOR,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 5,
    width: 150,
    height: 30,
  },
});
