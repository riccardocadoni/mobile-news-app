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

import { useSelector } from "react-redux";
import { selectAuthenticated } from "../redux/authSlice";
import useFirebaseAuth from "../hooks/useFirebaseAuth";

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
  console.log("isLogged", isLoggedIn);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="Root" component={BottomTabNavigator} />
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
