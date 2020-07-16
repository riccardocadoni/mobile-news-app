import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  TabNavigator: undefined;
  Auth: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Feed: undefined;
  Explore: undefined;
  Profile: undefined;
};

export type FeedParamList = {
  Feed: undefined;
};

export type ExploreParamList = {
  Explore: undefined;
  CreatorProfile: { cid: string };
};

export type ProfileParamList = {
  Profile: undefined;
  CreatorProfile: { cid: string };
};

export type AuthParamList = {
  Auth: undefined;
};

export type ProfileNavigationProp = StackNavigationProp<
  ProfileParamList,
  "Profile"
>;

export type ExploreNavigationProp = StackNavigationProp<
  ExploreParamList,
  "Explore"
>;
export type CreatorProfileRouteProp = RouteProp<
  ExploreParamList,
  "CreatorProfile"
>;
