import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList, CreatorProfileParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import AuthNavigator from "./AuthNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
//redux
import { useSelector } from "react-redux";
import { selectAuthenticated, selectIsLoading } from "../redux/authSlice";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
//custom component
import Loading from "../components/Loading";
import CreatorProfile from "../screens/CreatorProfile";
import ArticleVisualizer from "../screens/ArticleVisualizer";
import { ROOT_BACKGROUND_COLOR, PRIMARY_COLOR } from "../constants/Colors";
import { BOLD_FONT } from "../constants/Font";

type NavigationProps = {
  colorScheme: ColorSchemeName;
};

const Navigation: React.FC<NavigationProps> = ({ colorScheme }) => {
  useFirebaseAuth();
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Navigation;

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const isLoggedIn = useSelector(selectAuthenticated);
  const isLoading = useSelector(selectIsLoading);

  if (isLoading) return <Loading></Loading>;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: ROOT_BACKGROUND_COLOR,
        },
        headerTitleStyle: {
          fontSize: 25,
          fontFamily: BOLD_FONT,
          color: PRIMARY_COLOR,
        },
      }}
    >
      {isLoggedIn ? (
        <React.Fragment>
          <Stack.Screen
            name="TabNavigator"
            component={BottomTabNavigator}
            options={{ title: "Staging" }}
          />
          <Stack.Screen
            name="CreatorProfile"
            component={CreatorProfile}
            options={{ title: "CreatorProfile" }}
          />
          <Stack.Screen
            name="ArticleVisualizer"
            component={ArticleVisualizer}
            options={{ title: "Article" }}
          />
        </React.Fragment>
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ title: "Staging" }}
        />
      )}
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
