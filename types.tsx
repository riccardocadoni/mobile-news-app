import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { CreatorContentType } from "./redux/contentSlice";
export type RootStackParamList = {
  TabNavigator: undefined;
  CreatorProfile: { cid: string };
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
  ArticleVisualizer: CreatorContentType;
};

export type ExploreParamList = {
  Explore: undefined;
  CreatorProfile: any; // TODO: fix type { screen: string; params: { cid: string; }
};

export type ProfileParamList = {
  Profile: undefined;
  CreatorProfile: any;
};

export type AuthParamList = {
  SignIn: undefined;
  SignUp: undefined;
};
export type CreatorProfileParamList = {
  CreatorProfile: undefined;
  ArticleVisualizer: CreatorContentType;
};

export type AuthNavigationProp<T extends keyof AuthParamList> = {
  navigation: StackNavigationProp<AuthParamList, T>;
  route: RouteProp<AuthParamList, T>;
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
  "CreatorProfile"
>;
export type ArticleVisualizerRouteProp = RouteProp<
  CreatorProfileParamList | FeedParamList,
  "ArticleVisualizer"
>;
export type FeedNavigationProp = StackNavigationProp<FeedParamList, "Feed">;

//generalize props and routes
/* export type ProfileNavProps<T extends keyof ProfileParamList> = {
  navigation: StackNavigationProp<ProfileParamList, T>;
  route: RouteProp<ProfileParamList, T>;
}; */
