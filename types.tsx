import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { CreatorContentType } from "./redux/contentSlice";
export type RootStackParamList = {
  TabNavigator: undefined;
  CreatorProfileNavigator: { cid: string };
  ArticleVisualizer: { contentId: string };
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
  CreatorProfileNavigator: any; // TODO: fix type { screen: string; params: { cid: string; }
};

export type ProfileParamList = {
  Profile: undefined;
  CreatorProfileNavigator: any;
};

export type AuthParamList = {
  Auth: undefined;
};
export type CreatorProfileParamList = {
  CreatorProfile: undefined;
  ArticleVisualizer: CreatorContentType;
};

export type ProfileNavigationProp = StackNavigationProp<
  ProfileParamList,
  "Profile"
>;
export type ExploreNavigationProp = StackNavigationProp<
  ExploreParamList,
  "Explore"
>;
export type CreatorProfileNavigationProp = StackNavigationProp<
  CreatorProfileParamList,
  "CreatorProfile"
>;
export type CreatorProfileRouteProp = RouteProp<
  ExploreParamList,
  "CreatorProfileNavigator"
>;
export type ArticleVisualizerRouteProp = RouteProp<
  CreatorProfileParamList,
  "ArticleVisualizer"
>;
