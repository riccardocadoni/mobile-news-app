import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import firebase from "../firebase";
//redux
import { getAllCreators, selectExplore } from "../redux/exploreSlice";
import { useDispatch, useSelector } from "react-redux";
//custom component
import CreatorCard from "../components/CreatorCard";

export default function ExploreScreen() {
  const dispatch = useDispatch();
  const creators = useSelector(selectExplore);
  const user = firebase.auth().currentUser;
  const uid = user?.uid;

  React.useEffect(() => {
    dispatch(getAllCreators({ uid }));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Creators</Text>
      {creators?.map((creator) => (
        <CreatorCard
          key={creator.creatorId}
          firstName={creator.firstName}
          lastName={creator.lastName}
          profilePic={creator.profilePic}
          creatorId={creator.creatorId}
        ></CreatorCard>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
