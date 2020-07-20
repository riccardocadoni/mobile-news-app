import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Login from "../screens/Login";
import { AuthParamList } from "../types";

const AuthStack = createStackNavigator<AuthParamList>();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Auth"
        component={Login}
        options={{ headerTitle: "Login" }}
      />
    </AuthStack.Navigator>
  );
}
