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
import CreatorContentCard from "../components/CreatorContentCard";
import Loading from "../components/Loading";

export interface FeedProps {
  navigation: FeedNavigationProp;
}

const Feed: React.SFC<FeedProps> = ({ navigation }) => {
  const feed = useSelector(selectFeed);
  const isLoading = useSelector(selectIsLoading);
  const errorMessage = useSelector(selectErrorMessage);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!feed) {
      dispatch(getFeed({}));
    }
  }, []);

  const _renderItem = ({ item }: { item: CreatorContentType }) => (
    <CreatorContentCard navigation={navigation} {...item}></CreatorContentCard>
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
      <FlatList
        style={styles.flatList}
        data={feed}
        keyExtractor={(content) => content.contentId}
        renderItem={_renderItem}
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
});
