import * as React from "react";
import { StyleSheet, FlatList } from "react-native";

import { Text, View } from "../components/Themed";
//redux
import {
  getFeed,
  selectFeed,
  selectIsLoading,
  selectErrorMessage,
} from "../redux/feedSlice";
import { CreatorContentType } from "../redux/contentSlice";
import { useDispatch, useSelector } from "react-redux";
//type
import { FeedNavigationProp } from "../types";
//custom component
import FeedCard from "../components/FeedCard";
import Loading from "../components/Loading";
import { getFollowingData } from "../redux/profileSlice";
import { BOLD_FONT } from "../constants/Font";
import { PRIMARY_COLOR } from "../constants/Colors";

export interface FeedProps {
  navigation: FeedNavigationProp;
}

const Feed: React.FC<FeedProps> = ({ navigation }) => {
  const feed = useSelector(selectFeed);
  const isLoading = useSelector(selectIsLoading);
  const errorMessage = useSelector(selectErrorMessage);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!feed) {
      dispatch(getFeed({}));
      dispatch(getFollowingData({ }))
    }
  }, []);

  const _renderItem = ({ item }: { item: CreatorContentType }) => (
    <FeedCard navigation={navigation} {...item}></FeedCard>
  );
  if (isLoading) return <Loading></Loading>;

  if (errorMessage)
    return (
      <View>
        <Text>{errorMessage}</Text>
      </View>
    );
  return (
    <View style={styles.container}>
       { !feed?.length &&
    <Text style={styles.text}>There is no content here, try following someone in the explore section! Then pull down to refresh.</Text>
  }
      <FlatList
        style={styles.flatList}
        data={feed}
        keyExtractor={(content) => content.contentId}
        renderItem={_renderItem}
        onRefresh={()=>dispatch(getFeed({}))}
        refreshing={isLoading}
      />
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {},
  text: {
    fontSize: 20,
    fontFamily: BOLD_FONT,
    color: PRIMARY_COLOR,
    margin: 25,
  },
});
