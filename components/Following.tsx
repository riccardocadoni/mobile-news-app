import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileNavigationProp } from "../types";
import { selectFollowing, getFollowingData } from "../redux/profileSlice";
import { selectIsLoading } from "../redux/authSlice";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import CreatorCard from "./CreatorCard";
import { boldFont } from "../constants/Font";
import { titleTextColor } from "../constants/Colors";

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
    <View style={styles.container}>
      <Text style={styles.titleText}>Your Following: {following?.length}</Text>
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

export default Following;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  cardsContainer: {
    flexDirection: "row",
  },
  titleText: {
    fontSize: 20,
    fontFamily: boldFont,
    color: titleTextColor,
    margin: 15,
  },
});
