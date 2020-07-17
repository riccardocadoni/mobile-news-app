import * as React from 'react';
import { StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Text, View } from '../components/Themed';
import { TouchableOpacity, FlatList } from 'react-native';
import { CreatorProfileRouteProp } from '../types';
//redux
import {
  getCreatorInfo,
  getCreatorContent,
  selectCreator,
  selectIsLoading,
  creatorInfoType,
  creatorContentType,
} from '../redux/contentSlice';
import { useDispatch, useSelector } from 'react-redux';
//custom components
import CreatorContentCard from '../components/CreatorContentCard';
export interface CreatorProfileProps {
  route: CreatorProfileRouteProp;
}

const CreatorProfile: React.SFC<CreatorProfileProps> = ({ route }) => {
  const cid = route.params.cid;
  const dispatch = useDispatch();
  const creator = useSelector(selectCreator);

  React.useEffect(() => {
    if (!creator.info) dispatch(getCreatorInfo({ cid }));
    if (!creator.content) dispatch(getCreatorContent({ cid }));
  }, []);

  const _renderItem = ({ item }: { item: creatorContentType }) => (
    <CreatorContentCard {...item}></CreatorContentCard>
  );

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
        /* ListHeaderComponentStyle={styles} */
      />
    </View>
  );
};

export default CreatorProfile;

export interface CreatorInfoProps {
  creatorInfo: creatorInfoType | null;
}

const CreatorInfo: React.SFC<CreatorInfoProps> = ({ creatorInfo }) => {
  //TODO: refactor profilePic to photoUrl for consistency
  const url: string | undefined = creatorInfo?.profilePic
    ? creatorInfo.profilePic
    : undefined;
  return (
    <View style={styles.profileInfoContainer}>
      <Image source={{ uri: url }} style={styles.imageProfile} />
      <View style={styles.textInfoContainer}>
        <Text style={styles.text}>{creatorInfo?.firstName}</Text>
        <Text style={styles.text}>{creatorInfo?.lastName}</Text>
        <Text style={styles.text}>follow</Text>
      </View>
    </View>
  );
};
/* 
export interface CreatorContentProps {
  creatorContent: creatorContentType[];
}

const CreatorContent: React.SFC<CreatorContentProps> = ({ creatorContent }) => {
  const _renderItem = ({ item }: { item: creatorContentType }) => (
    <CreatorContentCard {...item}></CreatorContentCard>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={creatorContent}
        keyExtractor={(content) => content.contentId}
        renderItem={_renderItem}
      />

      {creatorContent.map((content) => {
        return (
          <CreatorContentCard
            key={content.contentId}
            {...content}
          ></CreatorContentCard>
        );
      })}
    </View>
  );
}; */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileInfoContainer: {
    flexDirection: 'row',
    backgroundColor: '#9FA8DA',
    padding: 30,
  },
  textInfoContainer: { backgroundColor: '#9FA8DA' },
  followingInfoContainer: {
    flex: 1,
  },
  cardsContainer: {
    flexDirection: 'row',
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
    alignItems: 'center',
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 10,
  },
});
