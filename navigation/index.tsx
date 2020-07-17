import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import AuthProcess from "./AuthProcess";
import LinkingConfiguration from "./LinkingConfiguration";
//redux
import { useSelector } from "react-redux";
import { selectAuthenticated, selectIsLoading } from "../redux/authSlice";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
//custom component
import CreatorProfile from "../screens/CreatorProfile";
import Loading from "../components/Loading";

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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <React.Fragment>
          <Stack.Screen name="TabNavigator" component={BottomTabNavigator} />
          <Stack.Screen
            name="CreatorProfile"
            component={CreatorProfile}
            options={{ headerTitle: "CreatorProfile" }}
          />
        </React.Fragment>
      ) : (
        <Stack.Screen name="Auth" component={AuthProcess} />
      )}
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
