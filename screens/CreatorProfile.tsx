import * as React from "react";
import { StyleSheet, Image, } from "react-native";
import { Text, View } from "../components/Themed";
import { TouchableOpacity, FlatList } from "react-native";
import { CreatorProfileRouteProp } from "../types";
//redux
import {
  getCreatorInfo,
  getCreatorContent,
  selectCreator,
  selectIsLoading,
  CreatorInfoType,
  CreatorContentType,
} from "../redux/contentSlice";
import {addNewFollow, deleteFollow, selectFollowingIds} from "../redux/profileSlice";
import { useDispatch, useSelector } from "react-redux";
//type
import { CreatorProfileNavigationProp } from "../types";
//custom components
import Loading from "../components/Loading";
import CreatorContentCard from "../components/CreatorContentCard";
import { REGULAR_FONT } from "../constants/Font";
import { PRIMARY_COLOR, BACKGROUND_COLOR } from "../constants/Colors";
export interface CreatorProfileProps {
  navigation: CreatorProfileNavigationProp;
  route: CreatorProfileRouteProp;
}

const CreatorProfile: React.FC<CreatorProfileProps> = ({
  route,
  navigation,
}) => {
  const cid = route.params.cid;
  const dispatch = useDispatch();
  const creator = useSelector(selectCreator);
  const isLoading = useSelector(selectIsLoading);

  React.useEffect(() => {
    if (!creator.info) dispatch(getCreatorInfo({ cid }));
    if (!creator.content) dispatch(getCreatorContent({ cid }));
    if (creator.info?.creatorId != null && creator.info?.creatorId !== cid) {
      dispatch(getCreatorInfo({ cid }));
      dispatch(getCreatorContent({ cid }));
    }
  }, []);

  const _renderItem = ({ item }: { item: CreatorContentType }) => (
    <CreatorContentCard navigation={navigation} {...item}></CreatorContentCard>
  );
  if (isLoading) return <Loading></Loading>;

  if (!creator.info || !creator.content)
    return (
      <View>
        <Text>Error, Creator not found</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      <FlatList
        data={creator.content}
        keyExtractor={(content) => content.contentId}
        renderItem={_renderItem}
        ListHeaderComponent={() => (
          <CreatorInfo creatorInfo={creator.info}></CreatorInfo>
        )}
      />
    </View>
  );
};

export default CreatorProfile;

export interface CreatorInfoProps {
  creatorInfo: CreatorInfoType | null;
}

const CreatorInfo: React.FC<CreatorInfoProps> = ({ creatorInfo }) => {
  const dispatch = useDispatch();
  const followingIds = useSelector(selectFollowingIds);
  const cid: string = creatorInfo.creatorId;
  //TODO: refactor profilePic to photoUrl for consistency
  const url: string | undefined = creatorInfo?.profilePic
    ? creatorInfo.profilePic
    : undefined;
  return (
    <View style={styles.creatorContainer}>
      <View style={styles.profileInfoContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: url }} style={styles.imageProfile} />
        </View>
        <View style={styles.textInfoContainer}>
          <Text style={styles.textInfo}>{creatorInfo?.firstName}</Text>
          <Text style={styles.textInfo}>{creatorInfo?.lastName}</Text>
          <View style={styles.followContainer}>
            <TouchableOpacity
              style={styles.followButton}
              onPress={() => {
                followingIds.includes(cid) ? dispatch(deleteFollow({creatorInfo,followingIds})) : dispatch(addNewFollow({creatorInfo,followingIds}));
              }}
            >
              <Text>{followingIds.includes(cid) ? 'Unfollow' : 'Follow' }</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  creatorContainer: {
    margin: 10,
    marginVertical: 15,
    borderRadius: 20,
    backgroundColor: BACKGROUND_COLOR,
  },
  profileInfoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: BACKGROUND_COLOR,
  },
  textInfoContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: BACKGROUND_COLOR,
  },
  textInfo: {
    fontSize: 25,
    fontFamily: REGULAR_FONT,
    color: PRIMARY_COLOR,
    margin: 5,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BACKGROUND_COLOR,
  },
  imageProfile: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  followContainer: {
    alignItems: "center",
    backgroundColor: BACKGROUND_COLOR,
  },
  followButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BACKGROUND_COLOR,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 5,
    width: 150,
    height: 30,
    marginVertical: 15,
  },
});
