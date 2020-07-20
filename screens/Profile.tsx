import * as React from "react";
import { StyleSheet, Image, ActivityIndicator } from "react-native";
import firebase from "../firebase";
import { Text, View } from "../components/Themed";
import { TouchableOpacity } from "react-native";
//type
import { ProfileNavigationProp } from "../types";
//redux
import { logUserOut } from "../redux/authSlice";
import {
  getFollowingData,
  selectFollowing,
  selectIsLoading,
} from "../redux/profileSlice";
import { useDispatch, useSelector } from "react-redux";
//custom components
import CreatorCard from "../components/CreatorCard";

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
        <Image source={{ uri: url }} style={styles.imageProfile} />
        <View style={styles.textInfoContainer}>
          <Text style={styles.text}>{user?.displayName}</Text>
          <Text style={styles.text}>{user?.email}</Text>
          <TouchableOpacity
            style={styles.logOutBtn}
            onPress={() => {
              dispatch(logUserOut());
            }}
          >
            <Text>LogOut</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Following user={user} navigation={navigation}></Following>
    </View>
  );
};

export default Profile;

export interface FollowingProps {
  user: firebase.User | null;
  navigation: ProfileNavigationProp;
}

const Following: React.SFC<FollowingProps> = ({ user, navigation }) => {
  const dispatch = useDispatch();
  const following = useSelector(selectFollowing);
  const isLoading = useSelector(selectIsLoading);
  const uid = user?.uid;

  React.useEffect(() => {
    if (!following) dispatch(getFollowingData({ uid }));
  }, []);

  return (
    <View style={styles.followingInfoContainer}>
      <Text style={styles.text}>Your Following: {following?.length}</Text>
      <View style={styles.cardsContainer}>
        {isLoading && <ActivityIndicator></ActivityIndicator>}
        {following?.map((creator) => (
          <CreatorCard
            key={creator.creatorId}
            firstName={creator.firstName}
            lastName={creator.lastName}
            creatorId={creator.creatorId}
            profilePic={creator.profilePic}
            goCreatorProfile={(cid: string) =>
              navigation.navigate("CreatorProfile", { cid: cid })
            }
          ></CreatorCard>
        ))}
      </View>
    </View>
  );
};

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
