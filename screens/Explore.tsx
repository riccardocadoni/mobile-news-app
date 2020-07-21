import * as React from "react";
import { StyleSheet, Button } from "react-native";
import { Text, View } from "../components/Themed";
import firebase from "../firebase";
import Layout from "../constants/Layout";
//type
import { ExploreNavigationProp } from "../types";
//redux
import { getAllCreators, selectExplore } from "../redux/exploreSlice";
import { useDispatch, useSelector } from "react-redux";
//custom component
import CreatorCard from "../components/CreatorCard";
import { titleTextColor } from "../constants/Colors";
import { boldFont } from "../constants/Font";

const screenWidth = Layout.window.width;

export interface ExploreProps {
  navigation: ExploreNavigationProp;
}

const Explore: React.SFC<ExploreProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const creators = useSelector(selectExplore);
  const user = firebase.auth().currentUser;
  const uid = user?.uid;

  React.useEffect(() => {
    dispatch(getAllCreators({ uid }));
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Top Creators</Text>
      </View>
      <View style={styles.cardsContainer}>
        {creators?.map((creator) => (
          <View style={styles.cardItem}>
            <CreatorCard
              key={creator.creatorId}
              {...creator}
              goCreatorProfile={(cid: string) =>
                navigation.navigate("CreatorProfile", { cid: cid })
              }
            ></CreatorCard>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cardItem: {
    width: screenWidth / 3,
  },
  titleContainer: {
    margin: 10,
  },
  title: {
    fontSize: 20,
    color: titleTextColor,
    fontFamily: boldFont,
  },
});
