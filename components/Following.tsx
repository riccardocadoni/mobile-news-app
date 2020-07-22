import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileNavigationProp } from "../types";
import {
  selectFollowing,
  getFollowingData,
  selectIsLoading,
  selectErrorMessage,
} from "../redux/profileSlice";
import { View, Text, StyleSheet } from "react-native";
import CreatorCard from "./CreatorCard";
import { BOLD_FONT } from "../constants/Font";
import { PRIMARY_COLOR } from "../constants/Colors";
import Loading from "./Loading";

export interface FollowingProps {
  user: firebase.User | null;
  navigation: ProfileNavigationProp;
}

const Following: React.SFC<FollowingProps> = ({ user, navigation }) => {
  const dispatch = useDispatch();
  const following = useSelector(selectFollowing);
  const isLoading = useSelector(selectIsLoading);
  const errorMessage = useSelector(selectErrorMessage);
  const uid = user?.uid;

  React.useEffect(() => {
    if (!following) dispatch(getFollowingData({ uid }));
  }, []);

  if (isLoading) return <Loading></Loading>;

  return (
    <View style={styles.container}>
      {following ? (
        <>
          <Text style={styles.titleText}>
            Your Following: {following?.length}
          </Text>
          <View style={styles.cardsContainer}>
            {errorMessage && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}
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
        </>
      ) : (
        <Text style={styles.titleText}>
          You have no following, take a look in the explore section!
        </Text>
      )}
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
    fontFamily: BOLD_FONT,
    color: PRIMARY_COLOR,
    margin: 15,
  },
  errorText: {
    fontSize: 15,
    color: "red",
    margin: 30,
  },
});
