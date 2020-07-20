import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
//types
import { AuthParamList } from "../types";
//custom components
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

const AuthStack = createStackNavigator<AuthParamList>();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerTitle: "Login" }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerTitle: "Login" }}
      />
    </AuthStack.Navigator>
  );
}
