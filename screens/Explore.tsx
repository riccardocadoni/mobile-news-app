import * as React from "react";
import { StyleSheet, Button, ActivityIndicator } from "react-native";
import { Text, View } from "../components/Themed";
import firebase from "../firebase";
import Layout from "../constants/Layout";
//type
import { ExploreNavigationProp } from "../types";
//redux
import {
  getAllCreators,
  selectExplore,
  selectErrorMessage,
  selectIsLoading,
} from "../redux/exploreSlice";
import { useDispatch, useSelector } from "react-redux";
//custom component
import CreatorCard from "../components/CreatorCard";
import { PRIMARY_COLOR } from "../constants/Colors";
import { BOLD_FONT } from "../constants/Font";
import Loading from "../components/Loading";

const screenWidth = Layout.window.width;

export interface ExploreProps {
  navigation: ExploreNavigationProp;
}

const Explore: React.SFC<ExploreProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const creators = useSelector(selectExplore);
  const user = firebase.auth().currentUser;
  const uid = user?.uid;
  const errorMessage = useSelector(selectErrorMessage);
  const isLoading = useSelector(selectIsLoading);

  React.useEffect(() => {
    dispatch(getAllCreators({ uid }));
  }, []);

  if (isLoading) return <Loading></Loading>;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Top Creators</Text>
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      </View>
      <View style={styles.cardsContainer}>
        {creators?.map((creator) => (
          <View style={styles.cardItem} key={creator.creatorId}>
            <CreatorCard
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
    color: PRIMARY_COLOR,
    fontFamily: BOLD_FONT,
  },
  errorText: {
    fontSize: 15,
    color: "red",
    margin: 30,
  },
});
